import mongoose from 'mongoose';

const theatreModel = new mongoose.Schema(  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    movies: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: 'Movie',
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
    ownerId: {
      type: mongoose.SchemaTypes.ObjectId,
      //required: true,
      ref: 'Users',
    },
  },
  {
    versionKey: false,
  });

const Theatre = mongoose.model('Theatre',theatreModel);

export default Theatre;