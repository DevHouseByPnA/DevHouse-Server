const { Router } = require('express');
const { TodoController } = require('../controllers/todo.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

/** todoRoute NOT REQUIRED ANYMORE, ADDED AS SUBROUTE OF workspaceRoute, check workspace.route.js */

const todoRoute = Router();

todoRoute
    .route('/')
    .get(authMiddleware, TodoController.getAllTodos)
    .post(authMiddleware, TodoController.createTodo);

todoRoute.route('/:id').put(authMiddleware, TodoController.updateTodo);

module.exports = {
    todoRoute,
};
