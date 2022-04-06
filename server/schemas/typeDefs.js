const {gql} = require ('apollo-server-express');
const typeDefs  = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book] 
}


type Book {
    bookId: ID!
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!



}

type Auth {
    token: ID!
    user: User

}
type Query{
    me: User
}
type Mutation {
  createUser(username:String!,password:String!,email:String!):Auth  
}

`;
module.exports = typeDefs; 