const { UserService } = require('./user.service');
const { Request } = require('../models/request.model');
const { WorkspaceService } = require('./workspace.service');
const { ProjectService } = require('./project.service');

class RequestService {
    static getRequestsCreatedByAUser = async userAuthId => {
        try {
            const user = await UserService.getOneUserByAuthId(userAuthId);
            if (!user) {
                throw new Error('user not found');
            }

            const requests = await Request.find({ sender: user._id })
                .populate('sender')
                .populate({
                    path: 'project',
                    populate: {
                        path: 'mentor',
                        model: 'User',
                    },
                })
                .exec();
            return requests;
        } catch (error) {
            throw error;
        }
    };

    static getRequestsReceivedByAUser = async userAuthId => {
        try {
            const user = await UserService.getOneUserByAuthId(userAuthId);
            if (!user) {
                throw new Error('user not found');
            }

            /** @type {any} */
            const requests = await Request.find()
                .populate('sender')
                .populate({
                    path: 'project',
                    populate: {
                        path: 'mentor',
                        model: 'User',
                    },
                })
                .exec();

            return requests.filter(req => req.project.mentor.id === user.id);
        } catch (error) {
            throw error;
        }
    };

    static getRequestById = async reqId => {
        try {
            const request = await Request.findById(reqId);
            await request
                .populate('sender')
                .populate({
                    path: 'project',
                    populate: {
                        path: 'mentor',
                        model: 'User',
                    },
                })
                .execPopulate();
            return request;
        } catch (error) {
            throw error;
        }
    };

    static createRequest = async (sendingUserAuthId, projectId) => {
        try {
            const sender = await UserService.getOneUserByAuthId(
                sendingUserAuthId
            );
            if (!sender) throw new Error('user not found');

            /** @type {any} */
            const project = await ProjectService.getProjectById(projectId);

            if (sender.id === project.mentor.id) {
                throw new Error('cannot send request to your own project');
            }

            const request = new Request({
                sender: sender._id,
                project: projectId,
            });

            await request.save();
            await request
                .populate('sender')
                .populate({
                    path: 'project',
                    populate: {
                        path: 'mentor',
                        model: 'User',
                    },
                })
                .execPopulate();
            return request;
        } catch (error) {
            throw error;
        }
    };

    static acceptRequest = async (userAuthId, requestId) => {
        try {
            /** @type {any} */
            const request = await RequestService.getRequestById(requestId);
            if (!request) {
                throw new Error('Request not found');
            }

            const mentor = request.project.mentor;

            if (mentor.authId !== userAuthId) {
                throw new Error('unauthorized');
            }

            const senderId = request.sender._id;
            await WorkspaceService.addMember(senderId, request.project._id);
            await request.delete();
        } catch (error) {
            throw error;
        }
    };
}

module.exports = {
    RequestService,
};
