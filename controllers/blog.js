const blogModel = require('../models/blog')
const ObjectId = require('mongoose').Types.ObjectId

const constants = require('../constants/constants')
const errors = constants.errors;
const common = constants.common;

class BlogController {
    async listBlogs(req,res,next) {
        const blogs = await blogModel.find({})
            .sort({createdAt:-1})
            .exec()
        return res.json(blogs).status(200)
    }
    async latestBlogs(req,res,next) {
        const blogs = await blogModel.find({})
            .sort({createdAt:-1})
            .limit(5)
            .exec()
        return res.json(blogs).status(200)
    }
    async getBlog(req,res,next) {
        const blog = await blogModel.findById(new ObjectId(req.params.blogId))
            .exec()
        if (!blog) {
            res.send(errors.BLOG_NOT_FOUND).status(404)
        }
        else {
            return res.json(blog).status(200)
        }
    }

    async newBlog(req, res, next) {
        const contentFile = req.files[common.CONTENT_FILENAME][0];
        const imageFile = req.files[common.IMAGE_FILENAME][0];

        const contentFilename = contentFile.filename;
        const imageFilename = imageFile.filename;

        const newBlog = await new blogModel({
        ...req.body,
        content: contentFilename,
        image: imageFilename,
        }).save();

        return res.status(200).json(newBlog);
    }
      
    async updateBlog(req,res,next) {
        const blogId = new ObjectId(req.params.blogId);
        const existingBlog = await blogModel.findById(blogId);

        if (!existingBlog) {
            return res.send(errors.BLOG_NOT_FOUND).status(404);
        }

        if (req.body.title) {
            existingBlog.title = req.body.title;
        }

        if (req.body.description) {
            existingBlog.description = req.body.description;
        }

        if (req.files[common.CONTENT_FILENAME]) {
            const contentFile = req.files[common.CONTENT_FILENAME][0];
            const contentFilename = contentFile.filename;
            existingBlog.content = contentFilename;
        }

        if (req.files[common.IMAGE_FILENAME]) {
            const imageFile = req.files[common.IMAGE_FILENAME][0];
            const imageFilename = imageFile.filename;
            existingBlog.image = imageFilename;
        }

        const updatedBlog = await existingBlog.save();
        return res.json(updatedBlog).status(200);
    }

    async deleteBlog(req,res,next) {
        const deleted = await blogModel.findByIdAndDelete(new ObjectId(req.params.blogId))
        return res.json(deleted).status(200)
    }
}

module.exports = new BlogController();
