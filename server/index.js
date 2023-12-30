import express from 'express'
import 'dotenv/config.js'
import { connectDB } from './config/db.js';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema.js';
import cors from 'cors';

const port=process.env.PORT;
const app=express();

connectDB();

app.use(cors());
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:process.env.NODE_ENV='development',
}));

app.listen(port,()=>{
    console.log(`listening on ${port}`);
});