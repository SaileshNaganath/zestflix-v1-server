import mongoose from 'mongoose';
import Theatre from '../models/theatreModels.js';
import asyncHandler from "express-async-handler";

export const verifyBookingReq = asyncHandler(async (req, res, next) => {
  if (!req.body.theatreId) {
    return res.status(406).send({
      message: 'Failed! TheatreId is required!',
    })
  }

  if (!mongoose.Types.ObjectId.isValid(req.body.theatreId)) {
    return res.status(406).send({
      message: 'Failed! TheatreId is not a valid ObjectId!',
    })
  }

  if (!req.body.movieId) {
    return res.status(406).send({
      message: 'Failed! MovieId is required!',
    })
  }

  if (!mongoose.Types.ObjectId.isValid(req.body.movieId)) {
    return res.status(406).send({
      message: 'Failed! MovieId is not a valid ObjectId!',
    })
  }

  const theatre = await Theatre.findOne({ _id: req.body.theatreId })

  if (theatre == null) {
    return res.status(404).send({
      message: 'Failed! Theatre not found ',
    })
  }

  if (!theatre.movies.includes(req.body.movieId)) {
    return res.status(404).send({
      message:
        "Failed! Movie is not found in particular theatre",
    })
  }

  if (!req.body.timing) {
    return res.status(406).send({
      message: 'Failed! Timing is not provided',
    })
  }

  if (!req.body.noOfSeats) {
    return res.status(406).send({
      message: 'Failed! Number of seats is not provided',
    })
  }

  next();
})

