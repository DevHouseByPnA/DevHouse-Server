const { Router } = require('express');
const { UserController } = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const userRoute = Router();

userRoute
    .route('/')
    .get(authMiddleware, UserController.getAllUsers)
    .post(authMiddleware, UserController.createUser);

module.exports = {
    userRoute,
}