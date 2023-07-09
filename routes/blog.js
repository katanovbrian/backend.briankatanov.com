const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const blogController = require('../controllers/blog');
const validators = require('../middleware/validators');
const upload = require('../lib/file-upload')
const constants = require('../constants/constants')
const common = constants.common;


router.route('/') 
    .get(asyncHandler(blogController.listBlogs))
    .post(upload.fields([{name:common.IMAGE_FILENAME},{name:common.CONTENT_FILENAME}]),
      validators.blogValidator,
      asyncHandler(blogController.newBlog));

router.get('/latest/', 
    asyncHandler(blogController.latestBlogs));

router.route('/:blogId/')
    .get(asyncHandler(blogController.getBlog))
    .put(upload.fields([{name:common.IMAGE_FILENAME},{name:common.CONTENT_FILENAME}]),asyncHandler(blogController.updateBlog))
    .delete(asyncHandler(blogController.deleteBlog));

module.exports = router;
