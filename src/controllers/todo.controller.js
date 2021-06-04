const { TodoListService } = require('../services/todolist.service')
const { TodoItemService } = require('../services/todoitem.service')
const { WorkspaceService } = require('../services/workspace.service');

class TodoController {

    static getAllTodos = async (req, res) => {
        try {
            const { body: { workspaceId } } = req;
            const todolist = await TodoListService.getTodoListByWorkspaceId(workspaceId);
            const todos = await TodoItemService.getAllTodos(todolist.id)
            return res.status(200).json({
                todos,
            });
        } catch (error) {
            return res.status(500).json({
                error: {
                    message: error.message,
                },
            });
        }
    }

    static createTodo = async (req, res) => {
        try {
            const { user: { uid }, body: { description, status, workspaceId } } = req;

            const workspace = await WorkspaceService.getWorkspaceById(workspaceId);

            if (workspace.project.mentor.authId !== uid) {
                return res.status(403).json({
                    error: {
                        message: 'You are not authorized',
                    },
                });
            }

            const todolist = await TodoListService.getTodoListByWorkspaceId(workspaceId);
            const todo = await TodoItemService.createTodo(todolist.id, description, status);
            return res.status(201).json({
                todo,
                message: "Todo Created!"
            });

        } catch (error) {
            return res.status(500).json({
                error: {
                    message: error.message,
                },
            });
        }
    }

    static updateTodo = async (req, res) => {
        try {
            const { user: { uid }, body: { description, status, workspaceId } } = req;

            const workspace = await WorkspaceService.getWorkspaceById(workspaceId);

            if (workspace.project.mentor.authId !== uid) {
                return res.status(403).json({
                    error: {
                        message: 'You are not authorized',
                    },
                });
            }

            const todolist = await TodoListService.getTodoListByWorkspaceId(workspaceId);
            const todo = await TodoItemService.updateTodo(todolist.id, { description, status });
            return res.status(200).json({
                todo,
                message: "Todo Updated!"
            });

        } catch (error) {
            return res.status(500).json({
                error: {
                    message: error.message,
                },
            });
        }
    }
}

module.exports = {
    TodoController
}