const { Workspace } = require('../models/workspace.model');
const { UserService } = require('./user.service');

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

    static createWorkspace = async (userId, projectId, name) => {
        try {
            const workspace = new Workspace({ name, projectId, members: [userId] });
            await workspace.save();
            return workspace;
        } catch (error) {
            throw error;
        }
    }

    // To be rechecked
    static findWorkspacesOfUser = async (authId) => {
        try {
            const user = await UserService.getOneUserByAuthId(authId);
            if (!user) throw new Error('User Not Found');

            const workspaces = await Workspace.find().populate({
                path: 'members',
                match: { _id: user.id }
            }).exec();

            return workspaces;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = {
    WorkspaceService,
};


// const f = () => {
//     return User.find().then(result => {
//         return result.user;
//     }).catch(err => {
//         console.log(err);
//     }) 
// }

// const asyncF = async () => {
//     try {
//         const result = await User.find();
//         return result.user;
//     } catch (err) {
//         console.log(err);
//     }
// }