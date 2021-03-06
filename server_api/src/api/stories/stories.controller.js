const StorieService = require('./stories.service');
const Mailer = require('../../services/mailer');
const path = require('path');
let envPath = path.join(__dirname, '../../../.env');
require('dotenv').config({ path: envPath });

class StorieController {
    constructor() {
        this.storieService = new StorieService();
        this.mailer = new Mailer({
            user: process.env.MAIL_ADDRESS,
            pass: process.env.MAIL_PASSWORD
        });
    }

    getStory(req, res) {
        const { id } = req.params;

        this.storieService
            .getStoryById(id)
            .then(story => res.json(story))
            .catch(error => {
                return res.status(400).json({
                    error: 'missing story id'
                });
            });
    }

    getStoriesByTags(req, res) {
        return this.listModeratedStrories(req, res, true);
    }

    getAllModeratedStories(req, res) {
        return this.listModeratedStrories(req, res, false);
    }

    listModeratedStrories(req, res, publishedOnly) {
        let tags = req.query.tags || '';
        if (tags) {
            tags = JSON.parse(tags);
            tags = tags.map(x => Number(x));
        }
        let page = parseInt(req.query.page) || 1;
        let pageSize = parseInt(req.query.pageSize) || 100;
        let sortField = req.query.sortField || 'sequence';
        let sortDirection = req.query.sortDirection || 'DESC';
        return this.storieService
            .listByTags(
                tags,
                page,
                pageSize,
                sortField,
                sortDirection,
                publishedOnly
            )
            .then(data => {
                res.json(data);
            });
    }

    addStory(req, res) {
        const instance = {
            whatTriggeredChange: req.body.whatTriggeredChange || '',
            howDidYouManged: req.body.howDidYouManged || '',
            additionalnfo: req.body.additionalnfo || '',
            whatHelpedYou: req.body.whatHelpedYou || '',
            background: req.body.background || '',
            storyContent: req.body.storyContent,
            mail: req.body.mail || '',
            name: req.body.name || '',
            contact: req.body.contact || false,
            contactTime: req.body.contactTime || ''
        };

        const mailData = {
            from: 'haytisham@gmail.com', // sender address
            to: 'contact@no2violence.co.il', // list of receivers
            subject: 'התקבלה עדות חדשה באתר', // Subject line
            text:
                ' היי! קיבלנו עדות חדשה שממתינה למודרציה לפני העלאה לאתר. אנא היכנסו אל וערכו את העדות וערכו אותה כדי שתעלה אל האתר.', // plain text body
            html:
                '<p dir="rtl"> היי! <br/> קיבלנו עדות חדשה שממתינה למודרציה לפני העלאה לאתר. אנא היכנסו וערכו את העדות כדי שתעלה אל האתר. </p>'
        };

        return this.storieService.createStory(instance).then(() => {
            this.mailer.send(mailData); // send automatic e-mail when story added
            res.sendStatus(200);
        });
    }

    addModerateStory(req, res) {
        const instance = {
            name: req.body.name,
            whatTriggeredChange: req.body.whatTriggeredChange,
            howDidYouManged: req.body.howDidYouManged,
            additionalnfo: req.body.additionalnfo,
            quote: req.body.quote,
            whatHelpedYou: req.body.whatHelpedYou,
            background: req.body.background,
            storyContent: req.body.storyContent,
            publish: req.body.publish
        };
        if (typeof req.body.publish == 'undefined') {
            instance.publish = true;
        }
        const originalStoryID = req.body.originalStory;
        if (!originalStoryID) {
            return res.status(400).json({
                error: 'missing originalStory this is the original story ID'
            });
        }
        if (req.body.tags) {
            instance.tags = req.body.tags;
            instance.tags = instance.tags.map(x => Number(x));
        }
        return this.storieService
            .createOrEditModeratedStory(instance, originalStoryID)
            .then(() => {
                res.sendStatus(200);
            })
            .catch(error => {
                console.error(error);
                return res.status(503).json({ error });
            });
    }

    getStortiesForModeration(req, res) {
        let page = parseInt(req.query.page) || 1;
        let pageSize = parseInt(req.query.pageSize) || 100;
        let sortField = req.query.sortField || 'sequence';
        let sortDirection = req.query.sortDirection || 'DESC';
        return this.storieService
            .listStriesToModerate(page, pageSize, sortField, sortDirection)
            .then(data => {
                res.json(data);
            });
    }

    getStoryForEdit(req, res) {
        const originalStoryID = req.query.originalStory;
        const moderatedStoryID = req.query.moderatedStory;
        if (!originalStoryID && !moderatedStoryID) {
            return res.status(400).json({
                error:
                    'missing story id please add parameter originalStory or moderatedStory'
            });
        }
        if (originalStoryID) {
            const p1 = this.storieService.getStoryById(originalStoryID);
            const p2 = this.storieService.getModeratedStoryByOriginalId(
                originalStoryID
            );
            return Promise.all([p1, p2]).then(stories => {
                const data = {
                    originalStory: stories[0],
                    moderatedStory: stories[1]
                };
                res.json(data);
            });
        } else if (moderatedStoryID) {
            return this.storieService
                .getModeratedStoryById(moderatedStoryID)
                .then(moderatedStory => {
                    if (moderatedStory && moderatedStory._id) {
                        return this.storieService
                            .getStoryById(moderatedStory.originalStory)
                            .then(originalStory => {
                                const data = { originalStory, moderatedStory };
                                res.json(data);
                            });
                    }
                });
        }
    }

    publishModerateStory(req, res) {
        const moderatedStoryID = req.body.moderatedStory;
        const publish = req.body.publish;
        if (!moderatedStoryID) {
            return res.status(400).json({ error: 'missing moderatedStory' });
        }
        return this.storieService
            .editModerateStory(moderatedStoryID, { publish: publish })
            .then(() => {
                res.json({ publish: publish });
            })
            .catch(error => {
                console.error(error);
                return res.status(503).json({ error });
            });
    }
}

module.exports = StorieController;
