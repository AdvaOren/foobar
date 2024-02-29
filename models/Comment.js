const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Comment = new Schema({
    text: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    postId:  {
        type: String,
        required: true
    }

});
module.exports = mongoose.model('Comment', Comment);