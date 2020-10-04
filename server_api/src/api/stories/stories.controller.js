const StorieService = require("./stories.service");

class StorieController {
    constructor() {
        this.storieService = new StorieService();
    }

    getStoriesByTags(req,res) {        
        let tags = req.query.tags || '';
        if(tags){
            tags = JSON.parse(tags);
            tags = tags.map(x => Number(x)); 
        }
        let page = parseInt(req.query.page) || 1;
        let pageSize = parseInt(req.query.pageSize) || 100;
        let sortField = req.query.sortField || "sequence";
        let sortDirection = req.query.sortDirection || "DESC";
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
        if(req.body.tags){
            instance.tags = req.body.tags;
            instance.tags = instance.tags.map(x => Number(x)); 
        }
        return this.storieService.createModeratedStory(instance, originalStoryID).then(() =>{
            res.sendStatus(200);
        }).catch((error) =>{
            console.error(error);
            return res.status(503).json({error});
        });
    }

    getStortiesForModeration(req,res){
        let page = parseInt(req.query.page) || 1;
        let pageSize = parseInt(req.query.pageSize) || 100;
        let sortField = req.query.sortField || "sequence";
        let sortDirection = req.query.sortDirection || "DESC";
        return this.storieService.listStriesToModerate(page, pageSize, sortField, sortDirection).then((data) =>{
            res.json(data);
        });     
    }
}
module.exports = StorieController;