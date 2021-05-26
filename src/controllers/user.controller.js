const { UserService } = require("../services/user.service")

class UserController {
    static getAllUsers = async (_req, res, _next) => {

        try {
            const users = await UserService.getAllUsers();
            return res.status(200).json({ users });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: {
                    message: error.message,
                }
            });
        }
    }
}

module.exports = {
    UserController
};