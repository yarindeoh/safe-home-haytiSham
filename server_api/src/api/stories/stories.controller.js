const StorieService = require('./stories.service');
// const Mailer = require('../../services/mailer');
const path = require('path');
let envPath = path.join(__dirname, '../../../.env');
require('dotenv').config({ path: envPath });

class StorieController {
    constructor() {
        this.storieService = new StorieService();
        /*
            TODO:
            For automatic email notifications once a new story is submitted, you should provide a receiver address, and its password.   
            Here, you provide email&password to Mailer from the env file. To use it, add a password and an email to the .env file, then uncomment 
            all relative code to mailer blow. 
            ( - creation of Mailer instance
              - send() method in addStory below
              - mailData in addStory below ) 
              - Mailer module 

            this.mailer = new Mailer({
                user: process.env.MAIL_ADDRESS,
                pass: process.env.MAIL_PASSWORD
            });       
        */
    }

    getStoriesByTags(req, res) {
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
            .listByTags(tags, page, pageSize, sortField, sortDirection)
            .then(data => {
                res.json(data);
            });
    }

    addStory(req, res) {
        const instance = {
            whatTriggeredChange: req.body.whatTriggeredChange || '',
            howDidYouManged: req.body.howDidYouManged || '',
            additionalnfo: req.body.additionalnfo || '',
            quote: req.body.quote || '',
            whatHelpedYou: req.body.whatHelpedYou || '',
            background: req.body.background || '',
            storyContent: req.body.storyContent,
            mail: req.body.mail || '',
            name: req.body.name || '',
            contact: req.body.contact || false
        };

        // const mailData = {
        //     from: 'haytisham@gmail.com', // sender address
        //     to: 'haytisham@gmail.com', // list of receivers
        //     subject: 'התקבלה עדות חדשה באתר', // Subject line
        //     text:
        //         ' היי! קיבלנו עדות חדשה שממתינה למודרציה לפני העלאה לאתר. אנא היכנסו אל וערכו את העדות וערכו אותה כדי שתעלה אל האתר.', // plain text body
        //     html:
        //         '<p dir="rtl"> היי! <br/> קיבלנו עדות חדשה שממתינה למודרציה לפני העלאה לאתר. אנא היכנסו וערכו את העדות כדי שתעלה אל האתר. </p>'
        // };

        return this.storieService.createStory(instance).then(() => {
            // this.mailer.send(mailData); // send automatic e-mail when story added
            res.sendStatus(200);
        });
    }

    addModerateStory(req, res) {
        const instance = {
            whatTriggeredChange: req.body.whatTriggeredChange,
            howDidYouManged: req.body.howDidYouManged,
            additionalnfo: req.body.additionalnfo,
            quote: req.body.quote,
            whatHelpedYou: req.body.whatHelpedYou,
            background: req.body.background,
            storyContent: req.body.storyContent
        };
        const originalStoryID = req.body.originalStory;
        if (!originalStoryID) {
            return res.status(400).json({
                error: 'missing originalStory this is the original story ID'
            });
        }
        return this.storieService
            .createModeratedStory(instance, originalStoryID)
            .then(() => {
                res.sendStatus(200);
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
}
module.exports = StorieController;
