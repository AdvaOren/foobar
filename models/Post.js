const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Post = new Schema({
    content: {
        type: String,
        required: true
    },
    img: {
        type: Buffer,
        required: true
    },
    date:  {
        type: Date,
        default: Date.now
    }

});
module.exports = mongoose.model('Post', Post);