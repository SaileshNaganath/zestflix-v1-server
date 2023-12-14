import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import {userTypesObject} from "../utils/constants.js";
import User from '../models/userModels.js';

export const isAuth = asyncHandler(async(req,res,next)=>{

        try{
            let token = req.headers.authorization;

            if(token){

              token = token.split(' ')[1];
              let decoded = jwt.verify(token , process.env.SECRET_KEY);
  
              req.user = await User.findById(decoded.id).select('-password');
              
              next();
            }
            else{
              res.status(406).send({
                message:'Token failed!'
              })
            }
            
        }catch(err){
            res.status(401).send({
                message:"Token not provided!"
            });
        }
    });

export const isAdmin = asyncHandler(async(req,res,next) =>{
  const user = await User.findOne({user: req.user});

    if (user.userType === userTypesObject.userTypes.admin) {
         next();
      } else {
        return res.status(401).send({ message: 'Invalid Admin Token' });
      }
}) ;

  
export const isAdminOrClient = asyncHandler(async(req,res,next) =>{
  const user = await User.findOne({user: req.user});
    if (user &&
      (user.userType === userTypesObject.userTypes.admin ||
        user.userType === userTypesObject.userTypes.client)) {
        next();
      } else {
        res.status(401).send({ message: 'Invalid Token' });
      }
});