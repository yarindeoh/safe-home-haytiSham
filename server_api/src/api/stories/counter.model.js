const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const counterSchema = new Schema({
    _id: String,
    sequence_value: Number
});

const Counter = mongoose.model('Counter', counterSchema, 'counter');
module.exports = Counter;