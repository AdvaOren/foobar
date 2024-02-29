const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Friends = new Schema({
    requester: {
        type: String,
        required: true
    },
    requested: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Friends', Friends);