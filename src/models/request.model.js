const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Types.ObjectId,
        required: true,
        index: true,
        ref: 'User',
    },
    project: {
        type: mongoose.Types.ObjectId,
        required: true,
        index: true,
        ref: 'Project',
    },
}, { timestamps: true });

const Request = mongoose.model('Request', RequestSchema);

module.exports = {
    Request,
};
