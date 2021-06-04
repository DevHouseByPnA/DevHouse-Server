const mongoose = require('mongoose');

const TodoListSchema = new mongoose.Schema({
    workspace: {
        type: mongoose.Types.ObjectId,
        ref: 'Workspace',
        required: true,
    }
}, { timestamps: true });

const TodoList = mongoose.model('TodoList', TodoListSchema);

module.exports = {
    TodoList
}