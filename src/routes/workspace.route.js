const { Router } = require('express');
const { WorkspaceController } = require('../controllers/workspace.controller');
const { TodoController } = require('../controllers/todo.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const workspaceRoute = Router();

workspaceRoute
    .route('/')
    .get(authMiddleware, WorkspaceController.getWorkspacesOfUser);

workspaceRoute
    .route('/:id')
    .get(authMiddleware, WorkspaceController.getWorkspaceById);

workspaceRoute
    .route('/:workspaceId/todos')
    .get(authMiddleware, TodoController.getAllTodos)
    .post(authMiddleware, TodoController.createTodo);

workspaceRoute
    .route('/:workspaceId/todos/:todoId')
    .put(authMiddleware, TodoController.updateTodo);

module.exports = {
    workspaceRoute,
};
