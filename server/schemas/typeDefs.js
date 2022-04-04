const {gql} = require ('apollo-server-express');
const typeDefs  = gql`
type User {
    -id: ID!
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
type Quer{
    me: User
}


`;
module.exports = typeDefs; 