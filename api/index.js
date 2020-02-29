const { ApolloServer, gql } = require("apollo-server");
const datamuse = require('datamuse');

const typeDefs = gql`
  scalar JSON
  type Query {
    hello: String ,
    keywords(name :String!,max:Int): JSON
  }
  
`;

const resolvers = {
  Query: {
    hello: (root, args, context) => "Hello from Searchmetrics!" ,
    keywords :(root, args, context) => {
      return datamuse.request(`words?ml=${args.name}&max=${args.max}`)
      .then((json) => {
        console.log(json);
        return json 
      });
    },
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
