const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project');
const asyncHandler = require('express-async-handler');
const validators = require('../middleware/validators');
const upload = require('../lib/file-upload')
const constants = require('../constants/constants')
const common = constants.common;

router.route('/')
    .get(asyncHandler(projectController.listProjects))
    .post(upload.single(common.IMAGE_FILENAME),
        validators.projectValidator,
        asyncHandler(projectController.newProject));

router.route('/:projectId/')
    .get(asyncHandler(projectController.getProject))
    .put(upload.single(common.IMAGE_FILENAME), asyncHandler(projectController.updateProject))
    .delete(asyncHandler(projectController.deleteProject));

module.exports = router;
