const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://shuvohabib:test123@ds147190.mlab.com:47190/gql-habib');
mongoose.connection.once('open',() => {
  console.log('Connected to DB')
})

app.use('/graphql/', graphqlHTTP({
  schema,
  graphiql:true
}));

app.listen(4000, ()=>{
    console.log('listening for request on port 4000')
});