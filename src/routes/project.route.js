const { Router } = require('express');
const { ProjectController } = require('../controllers/project.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const projectRoute = Router();

projectRoute
    .route('/')
    .get(authMiddleware, ProjectController.getAllProjects)
    .post(authMiddleware, ProjectController.createProject);

module.exports = {
    projectRoute,
};
