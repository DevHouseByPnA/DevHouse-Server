const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            index: true,
            unique: true,
            required: true,
        },
        description: {
            type: String,
            maxlength: 7 * 500,
        },
        requiredSkills: {
            type: [String],
            required: true,
        },
        peopleRequired: {
            type: Number,
            max: 50,
            min: 0,
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
        },
        mentor: {
            type: mongoose.Types.ObjectId,
            required: true,
            index: true,
            ref: 'User',
        },
        githubRepos: {
            type: [String],
        },
    },
    { timestamps: true }
);

ProjectSchema.index({
    name: 'text',
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = {
    Project,
};
