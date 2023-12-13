import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import {userTypesObject} from "../utils/constants.js";
import User from '../models/userModels.js';

export const isAuth = asyncHandler(async(req,res,next)=>{
    let token ; 

    const authorization = req.headers.authorization;

    if(authorization && authorization.startsWith('Bearer')){
        try{
            let token = authorization.slice(7,authorization.length);
            const decoded = jwt.verify(token , process.env.SECRET_KEY);

            req.user = await User.findById(decoded,id).select('-password');
            
            next();
        }catch(err){
            res.status(401).send({
                message:"Token failed!"
            });
        }
    }
    if(!token){
        res.status(401).send({
            message:'No token provided!'
        })
    }

});

export const isAdmin = asyncHandler(async(req,res,next) =>{
  const user = await User.findOne({userId: req.userId});

    if (user && user.userType == userTypesObject.userTypes.admin) {
        next();
      } else {
        res.status(401).send({ message: 'Invalid Admin Token' });
      }
}) ;

  
export const isAdminOrClient = asyncHandler(async(req,res,next) =>{
  const user = await User.findOne({userId: req.userId});
    if (user &&
      (user.userType == userTypesObject.userTypes.admin ||
        user.userType == userTypesObject.userTypes.client)) {
        next();
      } else {
        res.status(401).send({ message: 'Invalid Admin/Seller Token' });
      }
});