const Post = require('../models/post');

// get all posts
function getAllPosts(req,res){
    const posts = Post.getAllPosts();
    res.json(posts)
}

// get post by id
function getPost(req,res){
    const id = req.params.id;
    const post = Post.getPost(id);
    res.json(post)
}

// create new post
function createPost(req, res){
    const {title, content, author} = req.body;

    const post = {
        title,
        content,
        author
    }

    const newPost = Post.createPost(post)
    res.json(newPost)
}

// update post by id
function updatePost(req, res){
    const id = req.params.id;
    const updatedPost = req.body;

    const post = Post.updatePost(id, updatedPost);

    if (post === null) {
        return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
}

// delete post by id
function deletePost(req, res){
    const id = req.params.id;
    const post = Post.deletePost(id);

    res.json(post)
}

module.exports = {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}