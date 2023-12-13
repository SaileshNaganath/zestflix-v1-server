import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import serverConfig from './configs/serverConfig.js';

import seedRouter from './routes/seedRoutes.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import movieRouter from './routes/movieRoutes.js';
import theatreRouter from './routes/theatreRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';

dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=> console.log('DB Connected'))
    .catch((error)=>console.error(error));

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/seed',seedRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/movies', movieRouter);
app.use('/api/theatres', theatreRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/payments', paymentRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
  }

  app.listen(
    serverConfig.PORT, ()=>{
        console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${serverConfig.PORT}`
      )}
    
  )