import express from 'express';
import data from '../data/data.js';
import User from '../models/userModels.js';
import Movie from '../models/movieModels.js';
import Theatre from '../models/theatreModels.js';
import Booking from '../models/bookingModels.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await User.deleteMany({});
  const createdUsers = await User.insertMany(data.users);
  await Movie.deleteMany({});
  const createdMovies = await Movie.insertMany(data.movies);
  await Theatre.deleteMany({});
  await Booking.deleteMany({});
  res.send({ createdUsers , createdMovies });
});
export default seedRouter;
