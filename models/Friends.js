const mongoose = require('mongoose');

// Define the options for the status field
const statusOptions = ['ACCEPT', 'PENDING'];

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
        required: true,
        enum: statusOptions,
        default: 'PENDING' 
    }
});
module.exports = mongoose.model('Friends', Friends);