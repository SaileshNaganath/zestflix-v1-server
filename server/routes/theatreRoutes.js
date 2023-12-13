import express from 'express';
import {isAuth,isAdmin,isAdminOrClient} from '../middlewares/authMiddlewares.js';
import {
    getAllTheatres,
    getTheatre,
    getMoviesInTheatre,
    getTheatreById,
    addTheatre,
    addMovieToTheatre,
    updateTheatre,
    deleteTheatre,
    deleteMovieFromTheatre
} from '../controllers/theatreController.js';

const theatreRouter = express.Router();

theatreRouter.route('/')
                .get(isAuth,getAllTheatres)
                .get(isAuth,getTheatre)
                .post(isAuth,isAdmin,addTheatre);

theatreRouter.route('/:theatreId')
                .get(isAuth,getTheatreById)
                .put(isAdmin,isAdminOrClient,updateTheatre)
                .delete(isAuth,isAdmin,deleteTheatre);

theatreRouter.route('/:theatreName/:movieId')
                .get(isAuth,getMoviesInTheatre);
            
theatreRouter.route('/movies/:theatreId')
                .put(isAuth,isAdminOrClient,addMovieToTheatre)
                .delete(isAuth,isAdminOrClient,deleteMovieFromTheatre);
                

export default theatreRouter;

