const express = require('express');

const PostController = require('../controllers/posts');

const checkAuth = require('../middleware/check-auth');
const imageUpload = require('../middleware/image-upload');

const router = express.Router();

router.post('', checkAuth, imageUpload, PostController.createPost);

router.put('/:id', checkAuth, imageUpload, PostController.updatePost);

router.get('', PostController.getPosts);

router.get('/:id', PostController.getPost);

router.delete('/:id', checkAuth, PostController.deletePost);

module.exports = router;
