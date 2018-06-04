const mongoose = require('mongoose');
const Schema = require('mongoose');

const authorSchema = new Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('Author', authorSchema);
