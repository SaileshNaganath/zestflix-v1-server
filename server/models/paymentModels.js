import mongoose from "mongoose";

const paymentModel = new mongoose.Schema(  {
    bookingId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Booking',
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
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
  },
  {
    versionKey: false,
  });

const Payment = mongoose.model('Payment',paymentModel);

export default Payment;
