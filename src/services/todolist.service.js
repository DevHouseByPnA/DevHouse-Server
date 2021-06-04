const { TodoList } = require('../models/todolist.model');


class TodoListService {
    static getTodoListByWorkspaceId = async workspaceId => {
        try {
            const todolist = await TodoList.findOne({ workspace: workspaceId });
            return todolist;
        } catch (error) {
            throw error;
        }
    }

    static createTodoList = async workspaceId => {
        try {
            const todolist = new TodoList({ workspace: workspaceId })
            await todolist.save();
            return todolist;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = {
    TodoListService,
};
