const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true,
        unique: true,
    },
    project: {
        type: mongoose.Types.ObjectId,
        required: true,
        index: true,
        ref: 'Project',
    },
    members: {
        type: [mongoose.Types.ObjectId],
        required: true,
        index: true,
        ref: 'User',
    },
});

workspaceSchema.index({
    name: 'text',
});

const Workspace = mongoose.model('Workspace', workspaceSchema);

module.exports = {
    Workspace,
};
