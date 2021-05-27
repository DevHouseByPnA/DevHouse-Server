const { ProjectService } = require("../services/project.service");

class ProjectController {
    static getAllProjects = async (_req, res) => {
        try {
            const projects = await ProjectService.getAllProjects();
            return res.status(200).json({ projects });
        } catch (error) {
            return res.status(500).json({
                error: {
                    message: error.message,
                }
            });
        }
    };
}

module.exports = {
    ProjectController
}