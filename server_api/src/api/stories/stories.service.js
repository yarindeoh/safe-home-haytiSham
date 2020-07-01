const mongoose = require('mongoose');

const Story = require("./story.model");
const ModeratedStrory = require("./moderatedStory.model");
const Counter = require('./counter.model');

class StorieService {
    constructor() {
    }

    listByTags(tags, page = 1, pageSize = 100, sortField = "createdAt", sortDirection = "ASC"){
        sortDirection = sortDirection === 'ASC' ? '' : '-';
        sortField = sortDirection + sortField;
        const query = {}; //TODO implement by tag
        return Promise.all([
            ModeratedStrory.countDocuments(query),
            ModeratedStrory.find(query)
                .sort(sortField)
                .skip((page - 1) * pageSize).limit(pageSize)
                .populate('user')
        ])
            .then(([count, result]) => ({
                result, total: count, page: page, pages: Math.ceil(count / pageSize) }));
    }
    
    listStriesToModerate(page = 1, pageSize = 100, sortField = "createdAt", sortDirection = "ASC"){
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
        return Story.create(storyInstance);
    }

    createModeratedStory(storyInstance, originalStoryID){
        const o_id = new mongoose.mongo.ObjectId(originalStoryID);
        let promises = [];
        const p1 = Story.findOneAndUpdate({'_id': o_id}, {moderated:true} );
        promises.push(p1);
        const p2 = this.getValueForNextSequence('stories').then((number) => {
            storyInstance.sequence = number;
            storyInstance.originalStory = o_id;
            return ModeratedStrory.create(storyInstance);
        });
        promises.push(p2);
        return Promise.all(promises);
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