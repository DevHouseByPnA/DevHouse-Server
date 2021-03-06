const { UserService } = require('../services/user.service');

class UserController {
    static getAllUsers = async (_req, res, _next) => {
        try {
            const users = await UserService.getAllUsers();
            return res.status(200).json({ users });
        } catch (error) {
            return res.status(500).json({
                error: {
                    message: error.message,
                },
            });
        }
    };

    static getUser = async (req, res) => {
        try {
            const {
                params: { id: userId },
            } = req;

            const user = await UserService.getOneUserByUserId(userId);

            return res.status(200).json({ user });
        } catch (error) {
            return res.status(500).json({
                error: {
                    message: error.message,
                },
            });
        }
    };

    static getUserProfile = async (req, res) => {
        try {
            const {
                user: { uid: authId },
            } = req;

            const user = await UserService.getOneUserByAuthId(authId);

            return res.status(200).json({ user });
        } catch (error) {
            return res.status(500).json({
                error: {
                    message: error.message,
                },
            });
        }
    };

    static createUser = async (req, res, _next) => {
        try {
            const {
                user: { uid, email, displayName, photoURL, github },
            } = req;

            // console.log(req.user);

            const createdUser = await UserService.createNewUser({
                name: displayName,
                email,
                authId: uid,
                photoURL,
                github,
            });

            return res.status(201).json({
                user: createdUser,
                message: 'successfully created new user',
            });
        } catch (error) {
            return res.status(500).json({
                error: {
                    message: error.message,
                },
            });
        }
    };

    static updateUser = async (req, res) => {
        try {
            const {
                user: { uid },
                body: { name, skills, about },
            } = req;

            const updatedUser = await UserService.updateUser({
                authId: uid,
                name,
                skills,
                about,
            });

            return res.status(200).json({
                user: updatedUser,
                message: 'successfully updated user',
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
    UserController,
};
