const { Router } = require('express');
const { UserController } = require('../controllers/user.controller');

const userRoute = Router();

userRoute
    .route('/')
    .get(async (req, res, next) => {
        return await UserController.getAllUsers(req, res, next)
    });

module.exports = {
    userRoute,
}