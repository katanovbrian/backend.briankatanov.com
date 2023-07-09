const constants = require('../constants/constants')
const common = constants.common;
const errors = constants.errors;


async function projectValidator(req,res,next) {
    const imageFile = req.file;

    if (!imageFile) {
        res.send(errors.ADD_IMAGE).status(422)
    }

    if (!req.body.title) {
        res.send(errors.ADD_TITLE).status(422)
    }

    if (!req.body.description) {
        res.send(errors.ADD_DESCRIPTION).status(422)
    }

    if (!req.body.link) {
        res.send(errors.ADD_LINK).status(422)
    }

    next()
}

async function blogValidator(req,res,next) {
    const imageFile = req.files[common.IMAGE_FILENAME];
    const contentFile = req.files[common.CONTENT_FILENAME];
    if (!imageFile) {
        res.send(errors.ADD_IMAGE).status(422)
    }

    if (!contentFile) {
        res.send(errors.ADD_CONTENT).status(422)
    }
    
    if (!req.body.title) {
        res.send(errors.ADD_TITLE).status(422)
    }

    if (!req.body.description) {
        res.send(errors.ADD_DESCRIPTION).status(422)
    }

    next()

}

module.exports = {
    blogValidator,
    projectValidator
}