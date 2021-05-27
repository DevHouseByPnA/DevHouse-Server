const { Project } = require('../models/project.model');

class ProjectService {
    static getAllProjects = async () => {
        try {
            const projects = await Project.find();
            return projects;
        } catch (error) {
            console.log(error);
            throw new Error('something went wrong');
        }
    }
}

module.exports = {
    ProjectService
}