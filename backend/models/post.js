const mongoose = require('mongoose')

var postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter title'],
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Auth'
    },
    content: {
        type: String,
        required: [true, 'Please enter title']
    },
    images:{
        type: Array,
        required: [true, 'Please enter image']
    }
});
module.exports = mongoose.model('Post', postSchema)