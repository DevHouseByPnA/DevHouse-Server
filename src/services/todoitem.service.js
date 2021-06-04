const { TodoItem } = require('../models/todoitem.model')

class TodoItemService {
    static getAllTodos = async todoListId => {
        try {
            const todos = await TodoItem.find({ todolist: todoListId });
            return todos;
        } catch (error) {
            throw error;
        }
    }

    static createTodo = async (todolistId, description, status) => {
        try {
            const newTodo = new TodoItem({ todolist: todolistId, description, status })
            await newTodo.save();
            return newTodo;
        } catch (error) {
            throw error;
        }
    }

    static updateTodo = async (todoId, { description, status }) => {
        try {
            const todo = await TodoItem.findById(todoId)

            if (description && description.trim() !== "") {
                todo.description = description
            }

            if (status && status.trim() !== "") {
                todo.status = status
            }

            await todo.save();
            return todo;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = {
    TodoItemService
}