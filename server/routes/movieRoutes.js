import express from 'express';
import {isAuth,isAdmin, isAdminOrClient} from '../middlewares/authMiddlewares.js';
import {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovie,
    deleteMovie
} from "../controllers/movieController.js";


const movieRouter = express.Router();

movieRouter.route('/')
            .get(isAuth,getAllMovies)
            .post(isAuth,isAdminOrClient,createMovie);

movieRouter.route('/:movieId')
            .get(isAuth,getMovieById);

movieRouter.route('/:id')
            .put(isAuth,isAdmin,updateMovie)
            .delete(isAuth,isAdminOrClient,deleteMovie);

export default movieRouter;