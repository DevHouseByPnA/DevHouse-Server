const { RequestService } = require('../services/request.service');

class RequestController {
    static createRequest = async (req, res) => {
        try {
            const {
                user: { uid },
                body: { projectId },
            } = req;
            const request = await RequestService.createRequest(uid, projectId);
            return res.status(201).json({
                request,
            });
        } catch (error) {
            return res.status(500).json({
                error: {
                    message: error.message,
                },
            });
        }
    };

    static acceptRequest = async (req, res) => {
        try {
            const {
                user: { uid },
                params: { id: requestId },
            } = req;
            await RequestService.acceptRequest(uid, requestId);
            return res.status(201).json({
                message: 'Request Accepted',
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
    RequestController,
};
