import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './schema.js';
import resolvers from './resolvers/resolvers.js';

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
// export default prisma;
// const result = await prisma.user.findFirst({
//   where: { ID: Number(16) },
//   include: {
//       Feedback: true,
//       Place: true,
//       Place_Submission: true
//   }
// });

// console.log(result)
