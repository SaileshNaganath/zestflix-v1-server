import asyncHandler from 'express-async-handler';
import Theatre from '../models/theatreModels.js';
import Movie from '../models/movieModels.js';

// @desc    Get all theatres
// @route   GET /api/theatres
// @access  Private/ Authorized person
const getAllTheatres = asyncHandler(async(req,res)=>{
    const theatre = await Theatre.find({});
    res.status(200).send(theatre);
})

// @desc    Get theatres by query 
// @route   GET /api/theatres
// @access  Private/ Authorized person
const getTheatre = asyncHandler(async(req,res)=>{
    const queryObj={};
    if (req.query.name != undefined) {
        queryObj.name = req.query.name
      }
      if (req.query.city != undefined) {
        queryObj.city = req.query.city
      }
      if (req.query.pinCode != undefined) {
        queryObj.pinCode = req.query.pinCode
      }
      const theatres = await Theatre.find(queryObj)
      res.status(200).send(theatres);

})

// @desc    Get all movies in a theatre
// @route   GET /api/theatres/theatreName/:movieId
// @access  Private/ Authorized person
const getMoviesInTheatre = asyncHandler(async(req,res)=>{
    const theatre = await Theatre.findOne({name:req.params.theatreName});
    const movie = await Movie.findOne({_id:req.params.movieId});

    if(theatre.movies.includes(movie._id)){
       res.status(200).send({
        message:'Movie is available' 
       }) 
    } else {
        res.status(404).send({
            message:'Movie is not present'
        })
      }
})

// @desc    Get a theatre by id
// @route   GET /api/theatres/:theatreId
// @access  Private/ Authorized person
const getTheatreById = asyncHandler(async(req,res)=>{
    const theatre = await Theatre.findById(req.params.theatreId);
    if(theatre){
        res.status(200).send(theatre);
    }else{
        res.status(404).send({
            message:'Theatre not found'
        })
    }
})

// @desc    Add a theatre 
// @route   POST /api/theatres
// @access  Private/ Admin 
const addTheatre = asyncHandler(async(req,res)=>{
    const theatre ={
        name: req.body.name,
        city: req.body.city,
        description: req.body.description,
        pinCode: req.body.pinCode,
        ownerId: req.body.ownerId,
    }

  try {
    if (!theatre) {
      res.status(406).send('Please fill all fields to add a theatre...')
    } else if (theatre) {
      const theatre = Theatre.create(theatre)
      res.status(201).send('Theatre is added successfully')
    }
  } catch (error) {
    res.status(500).send('Internal Server error')
  }
})

// @desc    Add a movie to a theatre 
// @route   PUT /api/theatres/movies/:theatreId
// @access  Private/ Admin or Client
const addMovieToTheatre = asyncHandler(async(req,res)=>{
    try {
      const theatre = await Theatre.findOne({ _id: req.params.theatreId });
  
      let movieIds = req.body.movieIds
  
      if (req.body) {
        movieIds.forEach((movieId) => {
          let foundMovie = Movie.findOne({ _id: movieId })
          if (foundMovie) {
            if (!theatre.movies.includes(movieId)) {
              theatre.movies.push(movieId);
              theatre.save();
              res.status(202).send(theatre);
            } else if (theatre.movies.includes(movieId)) {
              res.status(400).send({
                message:'Movie is already present'
            });
            }
          }
        })
      }
    } catch (error) {
      res.status(500).send({
        message:'Internal Server Error'
    });
    }
  
})

// @desc    Update a theatre 
// @route   PUT /api/theatres/:theatreId
// @access  Private/ Admin or Client
const updateTheatre = asyncHandler(async(req,res)=>{
    const theatre = await Theatre.findById(req.params.theatreId);
    try{
        if(!theatre){
            return res.status(404).send({
                message: "Theatre not found"
              })
        }
        theatre.name = req.body.name || theatre.name
      theatre.description = req.body.description || theatre.description
      theatre.city = req.body.city || theatre.city
      theatre.pinCode = req.body.pinCode || theatre.pinCode
  
      let updatedTheatre = await theatre.save()
  
      res.status(202).send(updatedTheatre);
    }
    catch (error) {
        res.status(500).send('Internal Server error')
      }
})

// @desc    Delete a theatre 
// @route   PUT /api/theatres/:theatreId
// @access  Private/ Admin 
const deleteTheatre = asyncHandler(async(req,res)=>{
    const theatre = await Theatre.findById(req.params.theatreId);
    if(theatre){
        await Theatre.deleteOne(theatre);
        res.status(202).send({
            message:'Theatre Deleted'
        });
    }else{
        res.status(404).send({
            message:'Theatre not found'
        })
    }
})

// @desc    Delete a movie from a theatre 
// @route   PUT /api/theatres/movies/:theatreId
// @access  Private/ Admin 
const deleteMovieFromTheatre = asyncHandler(async(req,res)=>{

    let theatreId = req.params.theatreId
    let movieId = req.params.movieId

  try {
    if (!theatreId) {
      res.status(406).send({
        message:'Please enter a Valid theatreId for removing Movie from Theatre...'
      })
    } else {
      const theatre = await Theatre.findOne({ _id: theatreId })

      if (theatre.movies.includes(movieId)) {
        theatre.deleteOne(movieId);
        theatre.save();
        res.status(200).send({
            message:'Movie Removed Successfully'
        });
      }
    }
  } catch (error) {
    res.status(500).send({
        message:'Internal Server Error'
    })
  }
})


export {
    getAllTheatres,
    getTheatre,
    getMoviesInTheatre,
    getTheatreById,
    addTheatre,
    addMovieToTheatre,
    updateTheatre,
    deleteTheatre,
    deleteMovieFromTheatre,
}