const Post = require('../models/Post');
const mongoose = require('mongoose');

// get all posts
async function getAllPosts(req, res){
    try {
        const pageSize = req.query.ps || 10;
        const pageNumber = req.query.pn || 1;
        
        const filter = {};

        if (req.query.title) {
            filter.title = req.query.title;
        }

        if (req.query.author) {
            filter.author = req.query.author;
        }

        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.date) {
            filter.createdAt = { $gte: new Date(parseInt(req.query.date)) };
        }

        const skip = (pageNumber - 1) * pageSize;

        const posts = await Post.find(filter).skip(skip).limit(pageSize)

        if(!posts || posts.length === 0){
            return res.status(404).json({message: 'There are no Posts'})
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// get post by id
async function getPost(req, res){
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        
        const post = await Post.findOne({_id: id});

        if(!post){
            return res.status(404).json({message: 'Post not found'})
        }
        return res.status(200).json(post)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

async function createPost(req, res){
    try {
        const {title, content, author} = req.body;
        const post = new Post({
            title, 
            content,
            author
        });

        await post.save();
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updatePost(req, res){
    try {
        const id = req.params.id;
        const filter = {_id: id};
        const update = req.body;
        const post = await Post.findOneAndUpdate(filter, update)

        if(!post){
            res.status(404).json({message: 'Post not found'}) 
        }

        res.json({message: 'Post updated successfully', post})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deletePost(req, res){
    try {
        const id = req.params.id;
        const post = await Post.findOneAndDelete({_id: id})

        if(!post){
            res.status(404).json({message: 'Post not found'}) 
        }

        res.json({message: 'Post deleted successfully', post})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}