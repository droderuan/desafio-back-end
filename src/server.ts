import express, { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import { errors } from 'celebrate';

// mongoose connection
import './config/mongoose';

import AppError from 'errors/AppError';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('👽 server started');
});
