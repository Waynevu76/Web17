const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "user"},
    comment: String,
})

const PostSchema = new Schema({
    picture: { type: String, required: true},
    description: { type: String},
    like: [String],
    title: { type: String, required: true },
    comments: [CommentSchema],
    views: { type: Number, default: 0},
    date: { type: Date, default: new Date()},
    author: { type: Schema.Types.ObjectId, ref: 'user' },
}, {
    timestamps: true // createAt updateAti
}
);

module.exports = mongoose.model("post", PostSchema);