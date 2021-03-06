const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');
const typeDefs = require('./graphql/typeDefs');

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected...');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Yay! Our server is running at port ${res.url}`);
  })
  .catch((err) => {
    console.log(`Terminating with error ${err}`);
  });
