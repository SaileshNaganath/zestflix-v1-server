import asyncHandler from "express-async-handler";
import { userTypesObject, bookingAndPaymentObjects } from "../utils/constants.js";
import Booking from '../models/bookingModels.js';
import User from '../models/userModels.js';


// @desc    Create booking
// @route   POST /api/bookings
// @access  Private/ Authorized person
const createBooking = asyncHandler(async(req,res)=>{
    const user = await User.findOne({
        userId: req.userId,
      })
      let bookingObject = {
        theatreId: req.body.theatreId,
        movieId: req.body.movieId,
        userId: user._id,
        status: req.body.status,
        timing: req.body.timing,
        noOfSeats: req.body.noOfSeats,
        totalCost:
          req.body.noOfSeats * bookingAndPaymentObjects.ticketPrice,
      }
      try {
        const booking = await Booking.create(bookingObject)
        res.status(201).send(booking);
      } catch (err) {
        res.status(500).send({
          message: 'Internal error while creating the booking'
        })
      }

})

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/ Authorized person
const getAllBookings = asyncHandler(async(req,res)=>{
    const user = await User.findOne({
        userId: req.userId,
      })
    
      const queryObj = {}
      if (user.userType == userTypesObject.userTypes.admin) {
      } else {
        queryObj.userId = user._id
      }
    
      const booking = await Booking.find(queryObj)
      res.status(200).send(booking)
    
})

// @desc    Get booking by id
// @route   GET /api/bookings/:id
// @access  Private/ Authorized person
const getBookingById = asyncHandler(async(req,res)=>{
    const user = await User.findOne({ userId: req.userId })
    try {
      const bookings = await Booking.findOne({ _id: req.params.id })
      if (
        bookings.userId != user._id &&
        user.userType != userTypesObject.userTypes.admin
      ) {
        res.status(404).send({
          message: 'Access denied',
        })
      }
      res.status(200).send(bookings)
    } catch (err) {
      res.status(500).send({
        message: 'Internal error while searching for the booking by Id',
      })
    }
})

// @desc    Update booking 
// @route   PUT /api/bookings/:id
// @access  Private/ Authorized person
const updateBooking = asyncHandler(async(req,res)=>{
    const user = await User.findOne({ userId: req.userId })
    const booking = await Booking.findOne({
      _id: req.params.id,
    })
    if (booking === undefined || booking === null) {
      res.status(404).send({
        message: 'Booking not found',
      })
      return
    }
  
    if (
      user.userType != userTypesObject.userTypes.admin &&
      booking.userId != user._id
    ) {
      res.status(404).send({
        message: 'Access Denied.',
      })
      return
    }
    booking.theatreId = req.body.theatreId || booking.theatreId
    booking.movieId = req.body.movieId || booking.movieId
    booking.userId = req.body.userId || booking.userId
    booking.status = req.body.status || booking.status
  
    try {
      const updatedBooking = await booking.save()
      res.status(201).send(updatedBooking)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        message: 'Internal error while updating the booking',
      })
    }
})

// @desc    Delete booking 
// @route   DELETE /api/bookings/:id
// @access  Private/ Authorized person
const deleteBooking = asyncHandler(async(req,res)=>{
    const user = await User.findOne({ userId: req.userId })
    const booking = await Booking.findOne({ _id: req.params.id })
    if (booking === null) {
      res.status(404).send({
        message: 'Booking not found',
      })
      return
    }
    if (booking.userId != user._id) {
      res.status(404).send({
        message: 'Access Denied.',
      })
      return
    }
    try {
      await Booking.deleteOne({ _id: req.params.id })
      res.status(200).send({
        message: 'Booking deleted successfully',
      })
    } catch (err) {
      res.status(500).send({
        message: 'Internal error while deleting the booking',
      })
    }
})

export {
    getAllBookings,
    createBooking,
    getBookingById,
    updateBooking,
    deleteBooking
} 