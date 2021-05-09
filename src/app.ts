import path from 'path';

import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import * as dotenv from 'dotenv';
import express, { Application } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import logger from 'morgan';

dotenv.config();

import schema from './graphql';
import * as models from './models';
import { IResolverContext } from './types';
import { ensureToken } from './utils/token';

const mongooseOpts = {
  useFindAndModify: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.MONGO_DB_URI, mongooseOpts)
  .then(() => {
    console.log('Connected to database');
  })
  .catch(console.log);

const app: Application = express();

app.set('port', process.env.PORT);

app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false /*process.env.NODE_ENV === 'production' ? undefined : false*/,
  }),
);
app.use(logger('dev'));

async function checkToken(token: string) {
  const { UserModel } = models;

  try {
    const decoded: any = ensureToken(token);

    return await UserModel.findById(decoded.id);
  } catch (e) {
    return null;
  }
}

const apolloServer = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
  context: async ({ req, connection }) => {
    const context: IResolverContext = { models };
    if (connection) {
      return connection.context;
    }

    const token = req.headers.authorization;

    if (token) {
      context.user = await checkToken(token);
    }

    return context;
  },
});

apolloServer.applyMiddleware({ app });

export { app, apolloServer };
