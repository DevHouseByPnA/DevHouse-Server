const { WorkspaceService } = require('../services/workspace.service');

class WorkspaceController {
    static getAllWorkspaces = async (req, res) => {
        try {
            const workspaces = await WorkspaceService.getAllWorkspaces();
            res.status(200).json({ workspaces });
        } catch (error) {
            res.status(500).json({
                error: {
                    message: error.message,
                },
            });
        }
    };

    static getWorkspacesOfUser = async (req, res) => {
        try {
            const {
                user: { uid },
            } = req;
            const workspaces = await WorkspaceService.findWorkspacesOfUser(uid);
            res.status(200).json({ workspaces });
        } catch (error) {
            res.status(500).json({
                error: {
                    message: error.message,
                },
            });
        }
    };

    static getWorkspaceById = async (req, res) => {
        try {
            const {
                params: { id },
            } = req;

            const workspace = await WorkspaceService.getWorkspaceById(id);

            res.status(200).json({ workspace });
        } catch (error) {
            res.status(500).json({
                error: {
                    message: error.message,
                },
            });
        }
    };
}

module.exports = {
    WorkspaceController,
};
