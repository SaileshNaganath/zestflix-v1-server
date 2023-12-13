import express from 'express';
import{isAuth,isAdmin} from '../middlewares/authMiddlewares.js';
import {
    getAllUsers,
    getProfile,
    updateProfile,
    getUserById,
    updateUserById,
    deleteUser
} from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.route('/')
            .get(isAuth,isAdmin,getAllUsers);

userRouter.route('/profile')
            .get(isAuth,getProfile)
            .put(isAuth,updateProfile);

userRouter.route('/:id')
            .get(isAuth,isAdmin,getUserById)
            .put(isAuth,isAdmin,updateUserById)
            .delete(isAuth,isAdmin,deleteUser);

export default userRouter;