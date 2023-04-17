const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    "url": {
        type: String,
        required: true
    },
    "user": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USERS',
        required: true
    }
});

const model = mongoose.model('IMAGES', imageSchema);
module.exports = model;
