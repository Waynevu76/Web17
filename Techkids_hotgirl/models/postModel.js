const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: String,
    comments: String,
})

const PostSchema = new Schema({
    picture: { type: String, required: true},
    description: { type: String},
    like: [String],
    tittle: { type: String, required: true },
    comments: [CommentSchema],
    views: { type: Number, default: 0},
    date: { type: Date, default: new Date()},
    author: String,
}, {
    timestamps: true // createAt updateAti
}
);

module.exports = mongoose.model("post", PostSchema);