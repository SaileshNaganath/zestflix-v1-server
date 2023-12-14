import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";

// @desc    Get all users
// @route   GET /api/users
// @access  Private/ Admin
const getAllUsers = asyncHandler(async(req,res)=>{
    const users = await User.find({});
    return res.status(200).send(users);
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private / Any Authorized Person
const getProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);

    if(user){
        return res.status(200).send(user);
    }else{
        return res.status(404).send({
            message:'User not found'
        });
    }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private / Any Authorized Person
const updateProfile = asyncHandler(async(req,res)=>{
  try{
    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(user.isClient){
            user.client.name = req.body.clientName || user.client.name;
            user.client.logo = req.body.clientLogo || user.client.logo;
            user.client.description =
              req.body.clientDescription || user.client.description;
        }
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
          }
          const updatedUser = await user.save();

          return res.status(202).send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isClient: updatedUser.isClient,
            token: generateToken(updatedUser._id),
          });
    }else{
        return res.status(404).send({
            message:'User not found'
        });
    }
  }
  catch(error){
    return res.status(500).send({message:'Internal Server Error'});
  }
    
})

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private/ Admin
const getUserById = asyncHandler (async (req,res)=>{
    const user = await User.findById(req.params.id).select('-password')
  
    if (user) {
      return res.status(200).send(user);
    } else {
      return res.status(404).send({message:'User not found'})
    }
  })

// @desc    Update user by id
// @route   PUT /api/users/:id
// @access  Private/ Admin
const updateUserById = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.userId);
try{
  if(user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.userStatus = req.body.userStatus || user.userStatus;
    if(user.isClient){
        user.client.name = req.body.clientName || user.client.name;
        user.client.logo = req.body.clientLogo || user.client.logo;
        user.client.description =
          req.body.clientDescription || user.client.description;
    }
    if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();

      return res.status(202).send({updatedUser});
}else{
    return res.status(404).send({
        message:'User not found'
    });
}

}
catch(error){
  return res.status(500).send({message:'Internal Server Error'});
}

})

// @desc    Delete user by id
// @route   DELETE /api/users/:id
// @access  Private/ Admin
const deleteUser = asyncHandler (async (req,res)=>{
    const user = await User.findById(req.params.id)
  
    if (user) {
      await User.deleteOne(user)
      return res.status(200).send({ message: 'User has been removed' });
    } else {
      return res.status(404).send({message:'User not found'});
    }
  })

  
export {
    getAllUsers,
    getProfile,
    updateProfile,
    getUserById,
    updateUserById,
    deleteUser
}