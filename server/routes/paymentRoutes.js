import express from 'express';
import {isAuth} from '../middlewares/authMiddlewares.js';
import {
    getAllPayments,
    createPayment,
    getPaymentById
} from '../controllers/paymentController.js';

const paymentRouter = express.Router();

paymentRouter.route('/payments')
                .get(isAuth,getAllPayments)
                .post(isAuth,createPayment);

paymentRouter.route('/payments/:id')
                .get(isAuth,getPaymentById);

export default paymentRouter;