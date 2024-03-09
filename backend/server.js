import path from 'path'
import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const port = process.env.PORT 

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//parse cookie send together with the request & make it available in the req.cookie object 
app.use(cookieParser());


// routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);



app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  const __dirname = path.resolve();
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

//middleware
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server running on port ${port}`));