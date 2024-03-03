const Post = require('../models/Post');
const mongoose = require('mongoose');

// get all posts
async function getAllPosts(req, res){
    try {
        const pageSize = req.query.ps || 10;
        const pageNumber = req.query.pn || 1;
        const currentUser = req.user;
        
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

        if (currentUser.role !== 'Admin') {
            // If the user is not an admin, filter posts by userId
            filter.userId = currentUser._id;
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
async function getPost(req, res) {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid post ID' });
        }

        const post = await Post.findOne({ _id: id });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const currentUser = req.user;

        if (currentUser.role !== 'Admin' && post.userId.toString() !== currentUser._id.toString()) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        return res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function createPost(req, res){
    try {
        const {title, content, author} = req.body;
        const currentUser = req.user;
        const userId = currentUser._id
        const post = new Post({
            title, 
            content,
            author,
            userId
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

        const post = await Post.findOne(filter);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const currentUser = req.user;

        if (currentUser.role !== 'Admin' && post.userId.toString() !== currentUser._id.toString()) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const updatedPost = await Post.findOneAndUpdate(filter, update, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function deletePost(req, res){
    try {
        const id = req.params.id;
        const post = await Post.findOne({_id: id});

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const currentUser = req.user;

        // Check if the user is the owner of the post or if the user is an admin
        if (currentUser.role !== 'Admin' && post.userId.toString() !== currentUser._id.toString()) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        // Delete the post
        const deletedPost = await Post.findOneAndDelete({_id: id});

        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json({ message: 'Post deleted successfully', post: deletedPost });
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