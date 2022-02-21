const mongoose = require('mongoose');

const Schema = mongoose.Schema

const WebySchema = new Schema ({
    recipy: {type: String
    },
    chef:{type: String
    },
    category: {type: String
    },
    ingredients: { type: String
    },
    instructions: {type: String
    
    },
    imageUpload: String,

},{timestamps: true});

const Weby = mongoose.model('Weby', WebySchema);

module.exports = Weby