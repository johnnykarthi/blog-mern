const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blogSchema = new schema({
    blogId : {
        type: String,
        unique: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    author:{
        type: String,
        default: "jaykay"
    },
    tags:{
        type: Array,
        default: []
    },
    youtubeLink:{
        type: String,
        default: ''
    },
    videoLink:{
        type: String,
        default: ''
    },
    markdownContent:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);