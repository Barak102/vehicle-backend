import express, { Application, Request, Response } from 'express';
import vechileRouter from './routes/vechile-router';
import cors from 'cors';
import logger from './middlewares/logger';
import graphql, { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import {graphqlHTTP} from 'express-graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
var usersData = require('./MOCK_DATA.json');

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(logger);


const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    })
})

const rootQuery: Maybe<GraphQLObjectType> = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getAllUsers: {
            type: GraphQLList(userType),
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                return usersData;
                //logic here
                //for example: if we want to get user by id
            }
        }
    }
});
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: userType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parent, args) {
                //add here new user
                return args;
            }
        }
    }
});
const schema: GraphQLSchema = new GraphQLSchema({ query: rootQuery, mutation: mutation });

app.use('/graphql', graphqlHTTP((req,res,graphQLParams) => ({
    schema,
    graphiql: true
 })));

app.use('/api/vechile', vechileRouter);

app.listen(5000, () => {
    console.log('Listening to port 5000')
});