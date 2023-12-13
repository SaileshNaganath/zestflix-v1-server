import asyncHandler from 'express-async-handler';
import Movie from '../models/movieModels.js';

// @desc    Get all movies
// @route   GET /api/movies
// @access  Private/ Authorized person
const getAllMovies = asyncHandler(async(req,res)=>{
    const movies = await Movie.find({});
    res.status(200).send(movies);
})

// @desc    Create a movie
// @route   POST /api/movies
// @access  Private/ Admin or Client
const createMovie = asyncHandler(async(req,res)=>{

    const movie = {
        name: req.body.name,
        description: req.body.description,
        casts: req.body.casts,
        trailerUrl: req.body.trailerUrl,
        posterUrl: req.body.posterUrl,
        language: req.body.language,
        releaseDate: req.body.releaseDate,
        director: req.body.releaseDate,
        releaseStatus: req.body.releaseStatus,
      }
      try{ 
        if (!movie) {
        res.status(406).send('please fill all details to add A movie in DB...');
      }else {
        await Movie.create(movie);
        res.status(201).send('Movie is Successfully added');
      }
}
      catch (error) {
        res.status(500).send('Internal Server error')
      }

})

// @desc    Get a movie by id
// @route   GET /api/movies/:movieId
// @access  Private/ Authorized person
const getMovieById = asyncHandler(async(req,res)=>{
    const movie = await Movie.findById(req.params.id);
     if(movie){
        res.status(200).send(movie);
     }else{
        res.status(404).send({message:'Movie is not found'});
     }
})

// @desc    Update a movie
// @route   PUT /api/movies/:id
// @access  Private/ Admin
const updateMovie= asyncHandler(async(req,res)=>{
    const movie = await Movie.findOne(req.params.id);
try{  
    if (!movie) {
    res.status(404).send({
      message: 'Movie not found'
    })
  }
  
  movie.name = req.body.name || movie.name
  movie.description = req.body.description || movie.description
  movie.casts = req.body.casts || movie.casts
  movie.director = req.body.director || movie.director
  movie.trailerUrl = req.body.trailerUrl || movie.trailerUrl
  movie.posterUrl = req.body.posterUrl || movie.posterUrl
  movie.language = req.body.language || movie.language
  movie.releaseDate = req.body.releaseDate || movie.releaseDate
  movie.releaseStatus = req.body.releaseStatus || movie.releaseStatus

  const updatedMovie = await movie.save();
  res.status(202).send(updatedMovie);
}
catch(error){
    res.status(500).send({message:'Internal server error'});
}  

})


// @desc    Delete a movie
// @route   DELETE /api/movies/:id
// @access  Private/ Admin or Client
const deleteMovie = asyncHandler(async(req,res)=>{
    const movie = await Movie.findById(req.params.id);
     if(movie){
        await Movie.deleteOne(movie);
        res.status(200).send('Movie has been removed');
     }else{
        res.status(404).send({message:'Movie is not found'});
     }
})

export {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovie,
    deleteMovie
}