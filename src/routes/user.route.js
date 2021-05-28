const { Router } = require('express');
const { UserController } = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { validateUser } = require('../middlewares/validateUser.middleware');

const userRoute = Router();

userRoute
    .route('/')
    .get(authMiddleware, UserController.getAllUsers)
    .post(authMiddleware, UserController.createUser);

userRoute
    .route('/profile')
    .get(authMiddleware, UserController.getUserProfile)
    .put(authMiddleware, UserController.updateUser);

userRoute.route('/:id').get(authMiddleware, UserController.getUser);

module.exports = {
    userRoute,
};
