const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');

// Admin actions
router.post('/', blogController.createBlog); // Probably need multer here for file uploads in production

// Public actions
router.get('/', blogController.getBlogs);
router.get('/:slug', blogController.getBlogBySlug);
router.post('/:id/like', blogController.likeBlog);
router.post('/:id/comments', blogController.addComment);

module.exports = router;
