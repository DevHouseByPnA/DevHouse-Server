const { Router } = require('express');
const { RequestController } = require('../controllers/request.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const requestRoute = Router();

requestRoute.route('/').post(authMiddleware, RequestController.createRequest);

requestRoute
    .route('/sent')
    .get(authMiddleware, RequestController.getAllRequestsSentByUser);

requestRoute
    .route('/received')
    .get(authMiddleware, RequestController.getAllRequestsReceivedByUser);

requestRoute
    .route('/:id/accept')
    .post(authMiddleware, RequestController.acceptRequest);

module.exports = {
    requestRoute,
};
