const express = require('express');
const router = express.Router();
const {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/postController');

router.use(express.json())

router.get('/posts', getAllPosts);
router.get('/posts/:id', getPost);
router.post('/posts',createPost);
router.put('/posts/:id',updatePost);
router.delete('/posts/:id',deletePost);

module.exports = router