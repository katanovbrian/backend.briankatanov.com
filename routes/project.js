const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project');
const asyncHandler = require('express-async-handler');
const validators = require('../middleware/validators');
const upload = require('../lib/file-upload')
const constants = require('../constants/constants')
const common = constants.common;
const roles = constants.roles;
const {ensureLoggedInApi, ensureHasOneOfRoles} = require('../middleware/auth')

router.route('/')
    .get(asyncHandler(projectController.listProjects))
    .post(ensureLoggedInApi,
        ensureHasOneOfRoles([roles.admin,roles.maintainer]),
        upload.single(common.IMAGE_FILENAME),
        validators.projectValidator,
        asyncHandler(projectController.newProject));

router.route('/:projectId/')
    .get(asyncHandler(projectController.getProject))
    .put(ensureLoggedInApi,
        ensureHasOneOfRoles([roles.admin,roles.maintainer]),
        upload.single(common.IMAGE_FILENAME), 
        asyncHandler(projectController.updateProject))
    .delete(ensureLoggedInApi,
        ensureHasOneOfRoles([roles.admin,roles.maintainer]),
        asyncHandler(projectController.deleteProject));

module.exports = router;
