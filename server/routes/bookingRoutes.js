import express from 'express';
import {isAuth} from '../middlewares/authMiddlewares.js';
import {verifyBookingReq} from "../middlewares/bookingMiddlewares.js";
import {
    getAllBookings,
    createBookings,
    getBookingById,
    updateBooking,
    deleteBooking
} from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.route('/bookings')
                .get(isAuth,getAllBookings)
                .post(isAuth,verifyBookingReq,createBookings);

bookingRouter.route('/bookings/:id')
                .get(isAuth,getBookingById)
                .put(isAuth,updateBooking)
                .delete(isAuth,deleteBooking);

export default bookingRouter;