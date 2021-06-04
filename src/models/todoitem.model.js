const mongoose = require('mongoose');

const TodoItemSchema = new mongoose.Schema(
    {
        todolist: {
            type: mongoose.Types.ObjectId,
            ref: 'TodoList',
            required: true,
        },
        description: {
            type: String,
            maxlength: 7 * 150,
        },
        status: {
            type: String,
            lowercase: true
        }
    }, { timestamps: true }
)

const TodoItem = mongoose.model('TodoItem', TodoItemSchema);

module.exports = {
    TodoItem
}