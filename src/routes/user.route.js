const { Router } = require('express');
const { UserController } = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const userRoute = Router();

userRoute
    .route('/')
    .get(authMiddleware, UserController.getAllUsers)
    .post(authMiddleware, UserController.createUser);

userRoute
    .route('/profile')
    .put(authMiddleware, UserController.updateUser);


module.exports = {
    userRoute,
}