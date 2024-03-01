const express = require('express');
const router = express.Router();
const Posts = require('../controllers/postController');
const auth = require('../middlewares/auth')

router.use(express.json());

// Apply authentication middleware to all routes in this router
router.use(auth);

router.get('/getPosts', auth, Posts.getAllPosts);
router.get('/getPost/:id', auth, Posts.getPost);
router.post('/createPost', auth, Posts.createPost);
router.put('/updatePost/:id', auth, Posts.updatePost);
router.delete('/deletePost/:id', auth, Posts.deletePost);

module.exports = router