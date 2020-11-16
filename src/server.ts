import express from 'express';
import 'dotenv/config';
import { errors } from 'celebrate';

// mongoose connection
import './config/mongoose';

import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.use(errors());

app.listen(3333, () => {
  console.log('👽 server started');
});
