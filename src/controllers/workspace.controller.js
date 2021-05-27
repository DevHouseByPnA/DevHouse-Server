const { WorkspaceService } = require("../services/workspace.service");

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
}

module.exports = {
    WorkspaceController,
};
