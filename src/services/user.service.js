const { User } = require('../models/user.model');

class UserService {
    static getAllUsers = async () => {
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            console.log(error);
            throw new Error('something went wrong');
        }
    };

    static getOneUserByAuthId = async authId => {
        try {
            const user = await User.findOne({ auth_id: authId });
            return user;
        } catch (error) {
            throw new Error('something went wrong');
        }
    };

    static getOneUserByEmail = async userEmail => {
        try {
            const user = await User.findOne({ email: userEmail });
            return user;
        } catch (error) {
            throw new Error('something went wrong');
        }
    };

    static createNewUser = async userData => {
        const { name, email, authId, photoURL } = userData;
        try {
            const existingUser = await User.findOne({ authId });

            if (existingUser) {
                return existingUser;
            }

            const newUser = new User({
                name,
                email,
                authId,
                profilePicURL: photoURL,
                skills: [],
                about: '',
            });

            await newUser.save();
            return newUser;
        } catch (error) {
            throw new Error('something went wrong');
        }
    };

    static updateUser = async userData => {
        const { name, authId, skills, about } = userData;
        try {
            /** @type {any} */
            const user = await User.findOne({ authId });

            if (!user) {
                throw Error();
            }

            const newSkills =
                skills?.filter(skill => !user.skills.includes(skill)) || [];

            user.name = name?.trim() || user.name;
            user.skills = [...user.skills, ...newSkills];
            user.about = about;

            await user.save();

            return user;
        } catch (error) {
            throw new Error('something went wrong');
        }
    };
}

module.exports = {
    UserService,
};
