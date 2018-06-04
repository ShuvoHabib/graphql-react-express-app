const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const books = [
    { name:'Hello', genre: 'action2', id: '1', authorID: '1' },
    { name:'Hello2', genre: 'action2', id: '2', authorID: '2' },
    { name:'Hello3', genre: 'action3', id: '3', authorID: '2' },
];

const authors = [
  { name:'humayun', age: 10, id: '1' },
  { name:'zafar', age: 12, id: '2' },
  { name:'habib', age: 13, id: '3' },
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
              return _.find(authors, {id: parent.authorID})
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorID: parent.id })
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
              return _.find(books, {id: args.id})
            }
        },
        author: {
          type: AuthorType,
          args: { id: { type: GraphQLID }},
          resolve(parent, args) {
            return _.find(authors, {id: args.id})
          }
        },
        books: {
          type: new GraphQLList(BookType),
          resolve(parent, args) {
            return books
          }
        },
        authors: {
          type: new GraphQLList(AuthorType),
          resolve(parent,args) {
            return authors
          }
        }
    }
});


module.exports = new GraphQLSchema({
  query: RootQuery
});