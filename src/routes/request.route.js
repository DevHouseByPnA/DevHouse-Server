const { Router } = require('express');
const { RequestController } = require('../controllers/request.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const requestRoute = Router();

requestRoute.route('/').post(authMiddleware, RequestController.createRequest);
requestRoute
    .route('/:id/accept')
    .post(authMiddleware, RequestController.acceptRequest);

module.exports = {
    requestRoute,
};
