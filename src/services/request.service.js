const { UserService } = require("./user.service");
const { Request } = require("../models/request.model");

class RequestService {
    static createRequest = async (sendingUserAuthId, projectId) => {
        try {
            const sender = await UserService.getOneUserByAuthId(sendingUserAuthId);
            if (!sender) throw new Error('user not found');

            const request = new Request({
                sender: sender._id,
                project: projectId,
            });

            await request.save();
            await request.populate("sender").populate("project").execPopulate();
            return request;
        } catch (error) {
            throw error;
        }
    }
}