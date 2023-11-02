import mongoose from 'mongoose';

const configs: any = {
  development: {
    connection: process.env.DATABASE_CONNECTION_URI_DEV,
  },
  test: {
    connection: process.env.DATABASE_CONNECTION_URI_TEST,
  },
  staging: {
    connection: process.env.DATABASE_CONNECTION_URI_STAGE,
  },
  production: {
    connection: process.env.DATABASE_CONNECTION_URI_DEV,
  },
};

const config = configs[process.env.NODE_ENV || 'development'].connection;
/** Connect to Mongo */
export const mongooseConnection = async () => {
  return mongoose.connect(config, { retryWrites: true, w: 'majority' });
};
