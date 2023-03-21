const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports.mongoose = mongoose;
module.exports.connectionConfig = "mongodb://localhost:27017/library";

module.exports.bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    updateAt: {
        type: Date,
        default: Date.now,
        required: true
    }
}, { strict: false, versionKey: false });
