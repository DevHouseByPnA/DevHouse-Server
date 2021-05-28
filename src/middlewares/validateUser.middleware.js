const { UserService } = require('../services/user.service');

exports.validateUser = async (req, res, next) => {
    try {
        const {
            user: { uid: authId },
            params: { id: userId },
        } = req;
        const user = await UserService.getOneUserByAuthId(authId);

        if (!user) {
            throw new Error('user not found');
        }

        if (user._id !== userId) {
            return res.status(403).json({
                error: {
                    message: `you are not authorized`,
                },
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            error: {
                message: error.message,
            },
        });
    }
};
