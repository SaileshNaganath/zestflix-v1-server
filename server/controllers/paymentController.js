import asyncHandler from 'express-async-handler';
import Booking from '../models/bookingModels.js';
import Payment from '../models/paymentModels.js';
import User from '../models/userModels.js';
import { userTypesObject,bookingAndPaymentObjects } from '../utils/constants.js';

// @desc    Get All payments
// @route   GET /api/payments
// @access  Private/ Authorized person
const getAllPayments = asyncHandler(async(req,res)=>{
    const queryObj = {};
    const user = await User.findOne({ userId: req.userId });
  
    if (user.userType !== userTypesObject.userTypes.admin) {
      const bookings = await Booking.find({ userId: user._id });
      const bookingIds = bookings.map((booking) => booking._id);
      queryObj.bookingId = { $in: bookingIds };
    }
  
    try {
      const payment = await Payment.find(queryObj)
      res.status(200).send(payment)
    } catch (err) {
      res.status(500).send('Internal Server Error')
    }
})

// @desc    Get payment by id
// @route   POST /api/payments/:id
// @access  Private/ Authorized person
const getPaymentById = asyncHandler(async(req,res)=>{

    const user = await User.findOne({ userId: req.userId });

    try {
      const payments = await Payment.findOne({ _id: req.params.id });
      const booking = await Booking.findOne({ _id: payments.bookingId });
      if (
        user.userType !== userTypesObject.userTypes.admin &&
        booking !== null &&
        booking.userId !== user._id
      ) {
        res.status(404).send({
          message: 'Access denied'
        })
        return
      }
      res.status(200).send(payments);
    } catch (err) {
      res.status(500).send({
        message: 'Internal error while searching for the payment'
      })
    }
})

// @desc    Create payment
// @route   POST /api/payments
// @access  Private/ Authorized person
const createPayment = asyncHandler(async(req,res)=>{

    const booking = await Booking.findOne({ _id: req.body.bookingId })

    var bookingTime = booking.createdAt
    var currentTime = Date.now()
    var minutes = Math.floor((currentTime - bookingTime) / (1000 * 60))
    if (minutes > 5) {
      booking.status = bookingAndPaymentObjects.bookingStatus.expired
      await booking.save()
      return res.status(200).send({
        message: "Can't do the payment as the booking has expired."
      })
    }
  
    let paymentObject = {
      bookingId: req.body.bookingId,
      amount: req.body.amount,
      status: bookingAndPaymentObjects.paymentStatus.success,
    }
  
    if (req.body.amount < booking.amount) {
      return res.status(400).send({
        message: 'Payment amount is less than the booking amount',
      })
    }
  
    try {
      const payment = await Payment.create(paymentObject);
      booking.status = bookingAndPaymentObjects.bookingStatus.completed;
      await booking.save();

      return res.status(201).send(payment);
    } catch (err) {
      console.log(err.message)
      res.status(500).send({
        message: 'Internal server error while creating the booking'
      })
    }
})

export {
    getAllPayments,
    createPayment,
    getPaymentById
}