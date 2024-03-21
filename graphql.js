const { ApolloServer } = require('@apollo/server')
const userResolvr = require('./resolver/users')
const bookResolver = require('./resolver/books')
async function createGrphqlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `
           type User{
            id:ID!,
            name:String!,
            email: String!,
            admin:Boolean!
           },

           type Book {
            id: ID!
            title: String!
            author:String!
            soldOutUserId:ID!,
            borrowedUserId:ID!
          },

          type Query{
            
            getAllBooks:[Book]
            availableBookForBorrowAndBuy:[Book]

           userLogin(email:String!, password:String!):String
           getCurretnLoggedInUser:User
            users:[User]
          }
         type Mutation{
            createUser(name:String!, email:String!,password:String!,admin:Boolean!):String

            addBook(title:String!,author:String!):String
            borrowBook(bookId:ID!):String
            buyBook(bookId:ID!):String
             
            sendReqtoUser(bookId:ID!):String

         }

        `,

    resolvers: {
      Query: {
        ...userResolvr.queries,
        ...bookResolver.queries
      },

      Mutation: {
        ...userResolvr.mutation,
        ...bookResolver.mutation
      }

    }
  });
  // start gql server;

  await gqlServer.start();
  return gqlServer;
}

module.exports = createGrphqlServer;