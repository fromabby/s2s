const mongoose = require('mongoose')

var responseSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    post: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post'
    },
    content: {
        type: String,
        required: [true, 'Please enter content']
    }
});
module.exports = mongoose.model('Response', responseSchema)