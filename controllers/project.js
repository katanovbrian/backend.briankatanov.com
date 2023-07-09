const projectModel = require('../models/project')
const ObjectId = require('mongoose').Types.ObjectId

const constants = require('../constants/constants')
const errors = constants.errors;

class ProjectController {
    async listProjects(req,res,next) {
        const projects = await projectModel.find({})
            .sort({createdAt:-1})
            .exec()
        return res.json(projects).status(200)
    }
    async getProject(req,res,next) {
        const project = await projectModel.findById(new ObjectId(req.params.projectId))
            .exec()
        if (!project) {
            res.send(errors.PROJECT_NOT_FOUND).status(404)
        }
        else {
            return res.json(project).status(200)
        }
        return res.json(project).status(200)
    }
    async newProject(req,res,next) {
        const imageFile = req.file;
        const imageFilename = imageFile.filename;

        req.body.tags = JSON.parse(req.body.tags)
        
        const newProject = await new projectModel({
            ...req.body,
            image: imageFilename,
        }).save()
        
        return res.json(newProject).status(200)
    }
    async updateProject(req,res,next) {
        const projectId = new ObjectId(req.params.projectId);
        const existingProject = await projectModel.findById(projectId);

        if (!existingProject) {
            return res.send(errors.PROJECT_NOT_FOUND).status(404);
        }

        if (req.body.title) {
            existingProject.title = req.body.title;
        }

        if (req.body.description) {
            existingProject.description = req.body.description;
        }

        if (req.body.link) {
            existingProject.link = req.body.link;
        }

        if (req.body.tags) {
            req.body.tags = JSON.parse(req.body.tags)
            existingProject.tags = req.body.tags;
        }

        if (req.file) {
            const imageFile = req.file;
            const imageFilename = imageFile.filename;
            existingProject.image = imageFilename;
        }

        const updatedProject = await existingProject.save();
        return res.json(updatedProject).status(200);
    }
    async deleteProject(req,res,next) {
        const deleted = await projectModel.findByIdAndDelete(new ObjectId(req.params.projectId))
        return res.json(deleted).status(200)
    }
}

module.exports = new ProjectController();
