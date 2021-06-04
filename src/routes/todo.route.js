const { Router } = require('express');
const { TodoController } = require('../controllers/todo.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const todoRoute = Router();

todoRoute
    .route('/')
    .get(authMiddleware, TodoController.getAllTodos)
    .post(authMiddleware, TodoController.createTodo);

todoRoute.route('/:id').put(authMiddleware, TodoController.updateTodo);

module.exports = {
    todoRoute,
};
