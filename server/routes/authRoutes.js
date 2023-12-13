import express from 'express';
import {login,signup} from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.route('/').post(signup);
authRouter.route('/login').post(login);
          

export default authRouter;