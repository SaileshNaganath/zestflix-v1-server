import mongoose from 'mongoose';

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      userId: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        minLength: 5,
      },
      password: {
        type: String,
        required: true,
      },
      userType: {
        type: String,
        required: true,
        default: 'CUSTOMER',
      },
      userStatus: {
        type: String,
        required: true,
        default: 'APPROVED',
      },
},{
    timestamps:true
});

const User = mongoose.model('User',userModel);

export default User;