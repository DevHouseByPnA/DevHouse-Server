const { Project } = require('../models/project.model');
const { UserService } = require('../services/user.service');
const { WorkspaceService } = require('../services/workspace.service');

class ProjectService {
    static getAllProjects = async () => {
        try {
            const projects = await Project.find().populate('mentor');
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

            /**@type {any} */
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
            await newProject.populate('mentor').execPopulate();
            console.log(newProject);
            await WorkspaceService.createWorkspace(
                user._id,
                newProject._id,
                `workspace<${newProject.name}>`
            );
            return newProject.populate('mentor');
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
}

module.exports = {
    ProjectService,
};
