const { Router } = require('express');
const { WorkspaceController } = require('../controllers/workspace.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const workspaceRoute = Router();

workspaceRoute
    .route('/')
    .get(authMiddleware, WorkspaceController.getAllWorkspaces);

module.exports = {
    workspaceRoute,
};
