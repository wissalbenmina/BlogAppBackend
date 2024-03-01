const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [3, 'Title must be between 3 and 100 characters'],
        maxLength: [100, 'Title must be between 5 and 100 characters']
    },
    content: {
        type: String,
        required: true,
        minLength: [100, 'Content must be between 100 and 100 characters'],
        maxLength: [1000, 'Content must be between 100 and 100 characters']
    },
    author: {
        type: String,
        required: true,
        match: [/^[a-zA-Z\s]+$/, 'Author name must contain only letters and spaces']
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('Posts', postSchema);