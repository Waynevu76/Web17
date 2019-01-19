const express = require('express');
const PostApi = express.Router();

const PostModel = require('../models/postModel');

PostApi.use((req, res, next) => {
    console.log('Middleware');
    req.post = 'post1';
    next();
});

//Read all posts
PostApi.get('/', (req, res) => {
    const { page=1, per_page=5 } = req.query;
    //const perPage = 5;
    PostModel.find({})
    .select()
    .skip((page-1)*per_page)
    .limit(per_page)
    .then((posts) => {
        res.send({ data: posts});
    })
    .catch((error) => {
        res.send({ error })
    });
    
});

//Read post by id
PostApi.get('/:postId', (req, res) => {
    const { postId } = req.params;
    PostModel.findById(postId)
    .then((postFound) => {
        res.send({ data: postFound })
    })
    .catch((error) => {
        res.send({ error });
    });
});

// Create post
PostApi.post('/', (req, res) => {
    const { picture, description, like, tittle, comments, views, date, author } = req.body;
    const newPosts = { picture, description, like, tittle, comments, views, date, author };
    PostApi.init()
    .then(() => { 
        return PostModel.create(newPosts);
    })
    .then((postCreated) => {
        res.send({ data: postCreated });
    })
    .catch((error) => {
        res.send({ error });
    });
});

//Update posts
PostApi.put('/:postId', (req, res) => {
    const { postId } = req.params;
    const { picture, description, like, tittle, comments, views, date } = req.body;
    PostModel.findById(postId)
    .then((postFound) => {
        if(!postFound) res.send({ error: "Post not exist!"})
        else {
            postFound.picture = picture;
            postFound.description = description;
            postFound.like = like;
            postFound.tittle = tittle;
            postFound.comments = comments;
            postFound.views = views;
            postFound.date = date;
            return postFound.save();
        }
    })
    .then((postUpdated) => {
        res.send({ date: postUpdated })
    })
    .catch((error) => {
        res.send({ error })
    });
});

//Delete posts
PostApi.delete('/:postId', (req, res) => {
    const { postId } = req.params;
    PostModel.findByIdAndRemove(postId)
    .then(() => {
        res.send({ data: "success" })
    })
    .catch((err) => {
        res.send({ err })
    })
})
module.exports = PostApi;