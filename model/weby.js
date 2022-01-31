const mongoose = require('mongoose');

const Schema = mongoose.Schema

const WebySchema = new Schema ({
    recipy: String,
    chef: String,
    ingredients: String,
    instructions: String,
    imageUpload: String,

},{timestamps: true});

const Weby = mongoose.model('Weby', WebySchema);

module.exports = Weby