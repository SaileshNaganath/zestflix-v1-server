import mongoose from 'mongoose';

const bookingModel = new mongoose.Schema (  {
    theatreId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Theatre',
    },
    movieId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Movie',
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Users',
    },
    status: {
      type: String,
      required: true,
      default: 'IN_PROGRESS',
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => {
        return Date.now()
      },
    },
    updatedAt: {
      type: Date,
      default: () => {
        return Date.now()
      },
    },
    timing: {
      type: String,
      required: true,
    },
    noOfSeats: {
      type: Number,
      required: true,
    },
    totalCost: {
      type: Number,
    },
  },
  {
    versionKey: false,
  });

const Booking = mongoose.model ('Booking',bookingModel);

export default Booking;