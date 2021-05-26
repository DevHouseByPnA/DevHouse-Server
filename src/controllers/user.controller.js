const { UserService } = require("../services/user.service")

class UserController {
    static getAllUsers = async (_req, res, _next) => {

        try {
            const users = await UserService.getAllUsers();
            return res.status(200).json({ users });
        } catch (error) {
            return res.status(500).json({
                error: {
                    message: error.message,
                }
            });
        }
    }

    static createUser = async (req, res, _next) => {
        try {
            const { user: { uid, email, displayName, photoURL } } = req;

            const createdUser = await UserService.createNewUser({
                name: displayName,
                email,
                authId: uid,
                photoURL,
            });

            return res.status(200).json({ user: createdUser, message: 'successfully created new user' });
        } catch (error) {
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