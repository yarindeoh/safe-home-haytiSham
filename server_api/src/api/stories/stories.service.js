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
            // resolve tag id to tag name
            for(let i=0; i<result.length; i++){
                let story = result[i];
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
                    story.createdAt = new Date(story.createdAt).toDateString();
                }
                if(story.updatedAt){
                    story.updatedAt = new Date(story.updatedAt).toDateString();
                }
            }
            return {
                result, total: count, page: page, pages: Math.ceil(count / pageSize)
            }
        });
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
        ]).then(([count, result]) => ({
                result, total: count, page: page, pages: Math.ceil(count / pageSize) }));
    } 

    getStoryById(originalStoryID){
        return Story.findById(originalStoryID).lean();
    }

    getModeratedStoryById(storyID){
        return ModeratedStrory.findById(storyID).lean();
    }
    
    getModeratedStoryByOriginalId(originalStoryID){
        return ModeratedStrory.findOne({originalStory: ObjectId(originalStoryID)}).lean();
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