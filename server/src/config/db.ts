import mongoose from 'mongoose';

import env from './env.js';

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(env.MONGO_URI, {
    autoIndex: true,
  });

  console.log('Connected to MongoDB');
};

