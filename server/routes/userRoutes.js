import express from 'express';
import{isAuth,isAdmin} from '../middlewares/authMiddlewares.js';
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.route('/users')
            .get(isAuth,isAdmin,getAllUsers);

userRouter.route('/users/:id')
            .get(isAuth,getUserById)
            .put(isAuth,isAdmin,updateUser)
            .delete(isAuth,isAdmin,deleteUser);

export default userRouter;