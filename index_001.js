const express = require('express');
const express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');


var schema = buildSchema(`
type Query {
        message: String
    }
`);

var root = {
    message: () => { 
        console.log('Returning message');
        return 'Welcome to our first graphql server implementation with Node.js'
    }
};

var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4001, () => console.log('Express GraphQL Server Now Running On PORT 4000'));