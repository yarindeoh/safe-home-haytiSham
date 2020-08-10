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
    mail: String,
    name: String,
    sequence: Number,
    moderated: false,  
}, { timestamps: { createdAt: 'createdAt' } });

storySchema.index({ _id: 1, moderated: 1, sequence:1 });

const Story = mongoose.model('Story', storySchema, 'original_stories');
module.exports = Story;