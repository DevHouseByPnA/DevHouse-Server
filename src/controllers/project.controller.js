const { ProjectService } = require('../services/project.service');

class ProjectController {
    static getAllProjects = async (_req, res) => {
        try {
            const projects = await ProjectService.getAllProjects();
            return res.status(200).json({ projects });
        } catch (error) {
            return res.status(500).json({
                error: {
                    message: error.message,
                },
            });
        }
    };

    static getProject = async (req, res) => {
        const {
            params: { id },
        } = req;

        try {
            const project = await ProjectService.getProjectById(id);
            return res.status(200).json({ project });
        } catch (error) {
            return res.status(500).json({
                error: {
                    message: error.message,
                },
            });
        }
    };

    static createProject = async (req, res) => {
        try {
            const {
                user: { uid },
                body: {
                    name,
                    description,
                    requiredSkills,
                    peopleRequired,
                    githubRepos,
                },
            } = req;

            console.log(req.body);
            /** @type {any} */
            const newProject = await ProjectService.createNewProject(uid, {
                name,
                description,
                requiredSkills,
                peopleRequired: +peopleRequired,
                githubRepos,
            });

            return res.status(200).json({
                project: newProject,
                message: `successfully created project ${newProject.name}`,
            });
        } catch (error) {
            return res.status(500).json({
                error: {
                    message: error.message,
                },
            });
        }
    };
}

module.exports = {
    ProjectController,
};
