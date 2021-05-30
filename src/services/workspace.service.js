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

    static getWorkspaceById = async workspaceId => {
        try {
            const workspace = await Workspace.findById(workspaceId);
            await workspace.populate('members').execPopulate();
            return workspace;
        } catch (error) {
            console.log(error);
            throw new Error('something went wrong');
        }
    };

    static createWorkspace = async (userId, projectId, name) => {
        try {
            const workspace = new Workspace({
                name,
                project: projectId,
                members: [userId],
            });
            await workspace.save();
            return workspace;
        } catch (error) {
            throw error;
        }
    };

    // To be rechecked
    static findWorkspacesOfUser = async authId => {
        try {
            const user = await UserService.getOneUserByAuthId(authId);
            if (!user) throw new Error('User Not Found');

            /** @type {any} */
            const workspaces = await Workspace.find();

            let workspacesOfUser = workspaces.filter(w =>
                w.members.includes(user.id)
            );
            workspacesOfUser = await Promise.all(
                workspacesOfUser.map(
                    async w => await w.populate('members').execPopulate()
                )
            );

            return workspacesOfUser;
        } catch (error) {
            throw error;
        }
    };

    static addMember = async (userId, projectId) => {
        try {
            /** @type {any} */
            const workspace = await Workspace.findOne({ project: projectId });
            workspace.members.push(userId);
            await workspace.save();
        } catch (error) {
            throw error;
        }
    };
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
