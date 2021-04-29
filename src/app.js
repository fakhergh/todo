const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const helmet = require('helmet');
const logger = require('morgan');

const models = require('./models');
const schema = require('./graphql');
const { ensureToken } = require('./utils/token');

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

const app = express();

app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false /*process.env.NODE_ENV === 'production' ? undefined : false*/,
  }),
);
app.use(logger('dev'));

async function checkToken(token) {
  const { UserModel } = models;

  let decoded = null;

  try {
    decoded = ensureToken(token);

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
    const context = { models };
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

module.exports = { app };
