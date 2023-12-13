import express from 'express';
import {isAuth} from '../middlewares/authMiddlewares.js';
import {verifyBookingReq} from "../middlewares/bookingMiddlewares.js";
import {
    getAllBookings,
    createBooking,
    getBookingById,
    updateBooking,
    deleteBooking
} from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.route('/')
                .get(isAuth,getAllBookings)
                .post(isAuth,verifyBookingReq,createBooking);

bookingRouter.route('/:id')
                .get(isAuth,getBookingById)
                .put(isAuth,updateBooking)
                .delete(isAuth,deleteBooking);

export default bookingRouter;