const { Workspace } = require('../models/workspace.model');

class WorkspaceService {
    static getAllWorkspaces = async () => {
        try {
            const workspaces = await Workspace.find();
            return workspaces;
        } catch (error) {
            console.log(error);
            throw new Error('something went wrong');
        }
    };
}

module.exports = {
    WorkspaceService,
};
