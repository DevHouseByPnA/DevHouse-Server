const { default: axios } = require('axios');
const { firebaseAdmin } = require('../config/firebase-admin');

const userNotFoundError = new Error('User not found');

const getUserDetails = async uid => {
    try {
        const currentUser = await firebaseAdmin.auth().getUser(uid);
        return currentUser;
    } catch (error) {
        throw userNotFoundError;
    }
};

exports.getVerifiedUser = async authToken => {
    try {
        const decodedToken = await firebaseAdmin
            .auth()
            .verifyIdToken(authToken);
        const currentUser = await getUserDetails(decodedToken.uid);

        return currentUser;
    } catch (error) {
        if (error.message.startsWith(userNotFoundError.message)) {
            throw userNotFoundError;
        }

        throw new Error(`Invalid or expired token`);
    }
};

exports.authMiddleware = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization || '';
        const currentUser = await this.getVerifiedUser(authToken);
        req.user = currentUser;
        const githubResponse = await axios.get(
            `https://api.github.com/user/${currentUser.providerData[0].uid}`,
            {
                headers: {
                    Authorization: `token ${req.headers.githubtoken}`,
                },
            }
        );
        if (githubResponse.status < 400) {
            req.user.github = {
                username: githubResponse.data.login,
                profileURL: githubResponse.data.html_url,
            };
        }
        next();
    } catch (error) {
        // console.log('Auth Middleware Error: ', error);
        return res.status(401).json({
            error: {
                message: error.message,
            },
        });
    }
};
