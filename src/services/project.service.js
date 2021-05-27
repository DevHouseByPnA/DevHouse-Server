const { Project } = require('../models/project.model');
const { UserService } = require('../services/user.service');

class ProjectService {
    static getAllProjects = async () => {
        try {
            const projects = await Project.find();
            return projects;
        } catch (error) {
            console.log(error);
            throw new Error('something went wrong');
        }
    };

    static createNewProject = async (authId, projectData) => {
        try {
            const {
                name,
                description,
                requiredSkills,
                peopleRequired,
                githubRepos,
            } = projectData;

            if (
                !name ||
                !description ||
                !requiredSkills ||
                peopleRequired === undefined
            ) {
                throw Error('Invalid Inputs');
            }

            if (requiredSkills.length === 0) {
                throw Error('required skills cannot be empty');
            }

            const user = await UserService.getOneUserByAuthId(authId);

            if (!user) {
                throw Error('mentor not found');
            }

            const newProject = new Project({
                name,
                description,
                requiredSkills,
                peopleRequired,
                githubRepos: githubRepos || [],
                mentor: user.id,
                rating: 0,
            });

            await newProject.save();
            return newProject;
        } catch (error) {
            throw error;
        }
    };
}

module.exports = {
    ProjectService,
};
