import express from 'express';
import {isAuth,isAdmin} from '../middlewares/authMiddlewares.js';
import {
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie
} from "../controllers/movieController.js";


const movieRouter = express.Router();

movieRouter.route('/movies')
            .get(getAllMovies)
            .post(isAuth,isAdmin,createMovie);

movieRouter.route('/movieId')
            .get(getMovieById);

movieRouter.route('/:id')
            .put(isAuth,isAdmin,updateMovie)
            .delete(isAuth,isAdmin,deleteMovie);

export default movieRouter;