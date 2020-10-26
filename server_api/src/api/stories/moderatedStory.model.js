const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    whatTriggeredChange: String,
    howDidYouManged: String,
    additionalnfo: String,
    quote: String,
    whatHelpedYou: String, 
    background: String,
    storyContent: String,
    name: String,
    sequence: Number,
    publish: Boolean,
    tags: [Number],    
    originalStory: { type: 'ObjectId', ref: 'Story'},    
}, { timestamps: { createdAt: 'createdAt' } });

storySchema.index({ _id: 1, sequence: 1 });

const ModeratedStrory = mongoose.model('ModeratedStrort', storySchema, 'moderated_stories');
module.exports = ModeratedStrory;