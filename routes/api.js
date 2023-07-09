const express = require('express');
const router = express.Router();

const blogRouter = require('./blog');
const projectRouter = require('./project');

router.use('/blog', blogRouter);
router.use('/project', projectRouter);

module.exports = router;
