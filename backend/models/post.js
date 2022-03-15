const mongoose = require('mongoose')

var postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter title'],
    },
    author: {
        type: String,
        required: [true, 'Please enter author']
    },
    content: {
        type: String,
        required: [true, 'Please enter title']
    },
    images: {
        type: Array,
        required: [true, 'Please enter image']
    },
    createdAt: {
        type: Date,
        default: new Date(Date.now())
    },
    updatedAt: {
        type: Date,
        default: new Date(Date.now())
    },
    isArchived:{
        type: Boolean,
        default: false
    },
    isFeature:{
        type: Boolean,
        default: false
    },
    isSubFeature:{
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('Post', postSchema)