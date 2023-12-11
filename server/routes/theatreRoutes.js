import express from 'express';
import {isAuth,isAdmin,isAdminOrClient} from '../middlewares/authMiddlewares.js';
import {
    getAllTheatres,
    getMoviesInTheatre,
    getTheatreById,
    addTheatre,
    addMovieToTheatre,
    updateTheatre,
    deleteTheatre,
    deleteMovieFromTheatre,
    allTheatres
} from '../controllers/theatreController.js';

const theaterRouter = express.Router();

theaterRouter.route('/theatres')
                .get(getAllTheatres)
                .post(isAuth,isAdminOrClient,addTheatre);

theaterRouter.route('/theatres/:theatreId')
                .get(getTheatreById)
                .put(isAdmin,isAdminOrClient,updateTheatre)
                .delete(isAuth,isAdminOrClient,deleteTheatre);

theaterRouter.route('/theatres/:theatreName/:movieId')
                .get(isAuth,getMoviesInTheatre);
            
theaterRouter.route('/theatre/movies/:theatreId')
                .put(isAuth,isAdmin,addMovieToTheatre)
                .delete(isAuth,isAdmin,deleteMovieFromTheatre);

theaterRouter.route('/allTheatres')
                .get(allTheatres);

export default theaterRouter;

