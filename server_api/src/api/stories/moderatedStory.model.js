const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    whatTriggeredChange: String,
    howDidYouManged: String,
    additionalnfo: String,
    mail: String,
    quote: String,
    whatHelpedYou: String, 
    background: String,
    storyContent: String,
    name: String,
    sequence: Number,
    tags: [Number],    
    originalStory: { type: 'ObjectId', ref: 'Story'},    
}, { timestamps: { createdAt: 'creation_date' } });

storySchema.index({ _id: 1, submission: 1,table:1 });

const ModeratedStrory = mongoose.model('ModeratedStrort', storySchema, 'moderated_stories');
module.exports = ModeratedStrory;