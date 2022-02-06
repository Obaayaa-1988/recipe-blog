const mongoose = require('mongoose');

const Schema = mongoose.Schema

const ReviewSchema = new Schema ({
    username: String,
    comment: String,
    recipe_id: String
    

},{timestamps: true});

const Revy = mongoose.model('Revy', ReviewSchema);

module.exports = Revy