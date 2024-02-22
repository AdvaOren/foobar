const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Friends = new Schema({
    user1: {
        type: String,
        required: true
    },
    user2: {
        type: String,
        required: true
    },
});
module.exports = mongoose.model('Friends', Friends);