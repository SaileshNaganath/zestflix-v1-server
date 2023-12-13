import express from 'express';
import {isAuth} from '../middlewares/authMiddlewares.js';
import {
    getAllPayments,
    createPayment,
    getPaymentById
} from '../controllers/paymentController.js';

const paymentRouter = express.Router();

paymentRouter.route('/')
                .get(isAuth,getAllPayments)
                .post(isAuth,createPayment);

paymentRouter.route('/:id')
                .get(isAuth,getPaymentById);

export default paymentRouter;