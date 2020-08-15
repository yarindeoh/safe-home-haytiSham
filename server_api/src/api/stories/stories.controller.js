const StorieService = require("./stories.service");

class StorieController {
    constructor() {
        this.storieService = new StorieService();
    }

    getStoriesByTags(req,res) {
        //TODO read parameters from the request
        let tags = '';
        let page = 1;
        let pageSize = 100;
        let sortField = "createdAt";
        let sortDirection = "ASC";
        return this.storieService.listByTags(tags, page, pageSize, sortField, sortDirection).then((data) =>{
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
        }
        return this.storieService.createStory(instance).then(() =>{
            res.sendStatus(200);
        });
    }

    addModerateStory(req,res){
        const instance = {
            whatTriggeredChange: req.body.whatTriggeredChange,
            howDidYouManged: req.body.howDidYouManged,
            additionalnfo: req.body.additionalnfo,            
            quote: req.body.quote,
            whatHelpedYou: req.body.whatHelpedYou,
            background: req.body.background,
            storyContent: req.body.storyContent
        }
        const originalStoryID = req.body.originalStory;
        if(!originalStoryID){
            return res.status(400).json({error: "missing originalStory this is the original story ID"});
        }
        return this.storieService.createModeratedStory(instance, originalStoryID).then(() =>{
            res.sendStatus(200);
        });
    }

    getStortiesForModeration(req,res){
        //TODO read parameters from the request
        let page = 1;
        let pageSize = 100;
        let sortField = "createdAt";
        let sortDirection = "ASC";
        return this.storieService.listStriesToModerate(page, pageSize, sortField, sortDirection).then((data) =>{
            res.json(data);
        });     
    }
}
module.exports = StorieController;