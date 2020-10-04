const mongoose = require('mongoose');

const Story = require("./story.model");
const ModeratedStrory = require("./moderatedStory.model");
const Counter = require('./counter.model');

const TagController = require("../tags.controller");
const tagController = new TagController();

class StorieService {
    constructor() {
    }

    listByTags(tags, page = 1, pageSize = 100, sortField = "createdAt", sortDirection = "DESC") {
        sortDirection = sortDirection === 'ASC' ? '' : '-';
        sortField = sortDirection + sortField;
        const query = tags ? { tags: { '$in': tags } } : {};
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
            }
            return {
                result, total: count, page: page, pages: Math.ceil(count / pageSize)
            }
        });
    }
    
    listStriesToModerate(page = 1, pageSize = 100, sortField = "createdAt", sortDirection = "DESC"){
        sortDirection = sortDirection === 'ASC' ? '' : '-';
        sortField = sortDirection + sortField;
        const query = {moderated:false};
        return Promise.all([
            Story.countDocuments(query),
            Story.find(query)
                .sort(sortField)
                .skip((page - 1) * pageSize).limit(pageSize)
                .populate('user')
        ])
            .then(([count, result]) => ({
                result, total: count, page: page, pages: Math.ceil(count / pageSize) }));
    }    

    createStory(storyInstance){
        storyInstance.moderated = false;
        return this.getValueForNextSequence('original_stories').then((number) => {
            storyInstance.sequence = number;
            return Story.create(storyInstance).then((story) => {
                if(story){
                    return true;
                }
            });
        });        
    }

    createModeratedStory(storyInstance, originalStoryID){        
        const o_id = new mongoose.mongo.ObjectId(originalStoryID);
        return Story.findOneAndUpdate({'_id': o_id}, {moderated:true} ).lean().then((story) =>{
            storyInstance.sequence = story.sequence;
            return ModeratedStrory.create(storyInstance);
        });
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