import { connect, connection } from 'mongoose';

const mongoDbUrl = process.env.MONGODB_URL;

if (!mongoDbUrl) {
  throw new Error(
    'Unable to connect into MongoDB. Please, verify if .env file contain a url.',
  );
}

connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

connection.once('open', () => console.log('🍀 MongoDb conectado'));
