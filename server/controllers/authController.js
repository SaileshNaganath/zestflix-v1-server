import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import {userTypesObject} from '../utils/constants.js';
import User from '../models/userModels.js';

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const signup = asyncHandler(async(req,res)=>{
    const userExists = await User.findOne({email:req.body.email});
    if(userExists){
        res.status(403)
            .send({message:"User already exists"});
    }

    let userTypes = req.body.userType;
    let userStatus = req.body.userStatus;

    if (!userTypes) {
        userTypes == userTypesObject.userTypes.customer &&
          userStatus == userTypesObject.userStatus.approved
      } else if (userTypes == userTypesObject.userTypes.client) {
        userStatus == userTypesObject.userStatus.pending
      } else if (userTypes == userTypesObject.userTypes.admin) {
        userStatus == userTypesObject.userStatus.approved
      }

    const user = new User({
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,8),
        userType: userTypes,
        userStatus: userStatus,
    });

    const createdUser = await user.save();
    if(createdUser){
        res.status(201).send({
            name: createdUser.name,
            userId: createdUser.userId,
            email: createdUser.email,
            password: bcrypt.hashSync(createdUser.password,8),
            userType: createdUser.userTypes,
            userStatus: createdUser.userStatus,
            token: generateToken(user._id),
        })
    }else{
        res.status(406).send({message:'Invalid user data'});
    }
})

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async(req,res)=>{
    const user = await User.findOne({email:req.body.email});
    if(user){
        res.status(200).send({
            message:'User is Valid'
        });
        if(bcrypt.compareSync(req.body.password , user.password)){
            res.send({
                _id:user._id,
                name: user.name,
                email: user.email,
                userType: user.userType,
                userStatus: user.userStatus,
                token: generateToken(user._id),
            })
            return;
        }else{
            res.status(406).send({
                message:'Invalid Password'
            })
        }
    }
    res.status(406).send({message:'Invalid email'});
})

export{
    signup,
    login
}