const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Story = require("./story.model");
const ModeratedStrory = require("./moderatedStory.model");
const Counter = require('./counter.model');

const TagController = require("../tags.controller");
const tagController = new TagController();

class StorieService {
    constructor() {
    }

    listByTags(tags, page = 1, pageSize = 100, sortField = "createdAt", sortDirection = "DESC", publishedOnly=true) {
        sortDirection = sortDirection === "ASC" ? "" : "-";
        sortField = sortDirection + sortField;
        const query = tags ? { tags: { "$in": tags } } : {};
        if(publishedOnly){
            query["publish"] = true;
        }        
        return Promise.all([
            ModeratedStrory.countDocuments(query),
            ModeratedStrory.find(query)
                .sort(sortField)
                .skip((page - 1) * pageSize).limit(pageSize)
                .lean()
        ]).then(([count, result]) => {            
            for(let i=0; i<result.length; i++){
                let story = result[i];
                this.updateStoryInfo(story);
            }
            return {
                result, total: count, page: page, pages: Math.ceil(count / pageSize)
            }
        });
    }

    updateStoryInfo(story){
        if(!story || story == null) return;
        if(story.tags){
            story.tagsIds = story.tags;
            story.tags = [];
            for(let t=0; t<story.tagsIds.length; t++){
                let tagName = tagController.tagsMap[story.tagsIds[t]];
                if(tagName){
                    story.tags.push(tagName);
                }
            }
        }
        if(story.createdAt){
            const date = new Date(story.createdAt);
            story.createdAt = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;
        }
        if(story.updatedAt){
            const date = new Date(story.updatedAt);
            story.updatedAt = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;
        }        
    }
    
    listStriesToModerate(page = 1, pageSize = 100, sortField = "createdAt", sortDirection = "DESC"){
        sortDirection = sortDirection === "ASC" ? "" : "-";
        sortField = sortDirection + sortField;
        const query = {moderated:false};
        return Promise.all([
            Story.countDocuments(query),
            Story.find(query)
                .sort(sortField)
                .skip((page - 1) * pageSize).limit(pageSize)
                .populate('user')
                .lean()
            ]).then(([count, result]) => {            
                for(let i=0; i<result.length; i++){
                    let story = result[i];
                    this.updateStoryInfo(story);
                }
                return {
                    result, total: count, page: page, pages: Math.ceil(count / pageSize)
                }
            });
    } 

    getStoryById(originalStoryID){
        let story = Story.findById(originalStoryID).lean();
        this.updateStoryInfo(story);
        return story;
    }

    getModeratedStoryById(storyID){
        let story = ModeratedStrory.findById(storyID).lean();
        this.updateStoryInfo(story);
        return story;
    }
    
    getModeratedStoryByOriginalId(originalStoryID){
        let story = ModeratedStrory.findOne({originalStory: ObjectId(originalStoryID)}).lean();
        this.updateStoryInfo(story);
        return story;
    }
    

    createStory(storyInstance){
        storyInstance.moderated = false;
        return this.getValueForNextSequence("original_stories").then((number) => {
            storyInstance.sequence = number;
            return Story.create(storyInstance).then((story) => {
                if(story){
                    return true;
                }
            });
        });        
    }

    createOrEditModeratedStory(storyInstance, originalStoryID){        
        let p1 = this.getModeratedStoryByOriginalId(originalStoryID);
        let p2 = Story.findByIdAndUpdate(originalStoryID, {moderated:true} ).lean();
        return Promise.all([p1,p2]).then((result) =>{
            let mStory = result[0];
            let story = result[1];
            if(story === null){
                throw "error no original story found";
            }
            storyInstance.sequence = story.sequence;
            const o_id = new mongoose.mongo.ObjectId(originalStoryID);
            storyInstance.originalStory = o_id;
            if(!mStory || mStory == null){ // moderated story not exist - create                
                return ModeratedStrory.create(storyInstance);
            }
            else{ // moderated story exist - update
                return ModeratedStrory.findByIdAndUpdate(mStory._id, storyInstance);
            }
        });
    }

    editModerateStory(storyID, update){
        return ModeratedStrory.findByIdAndUpdate(storyID, {$set: update});
    } 

    getValueForNextSequence(sequenceOfName)  {
        return new Promise((resolve, reject) => {
            Counter.findOneAndUpdate({ _id: sequenceOfName }, { $inc: { sequence_value: 1 } }, function (err, sequenceDoc) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(sequenceDoc.sequence_value + 1);
            });
        });
    }
    
}
module.exports = StorieService;