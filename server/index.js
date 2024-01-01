import express from 'express'
import 'dotenv/config.js'
import { connectDB } from './config/db.js';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema.js';
import cors from 'cors';
import { upload } from './uitls/multerUtils.js';
import { File } from './models/File.js';
import { fileURLToPath } from 'url';
import { dirname,join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port=process.env.PORT;
const app=express();

connectDB();

app.use(express.json());
app.use(cors());
app.use('/files', express.static(join(__dirname, 'files')));
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:process.env.NODE_ENV='development',
}));

app.post('/upload-file',upload.single('file'),async(req,res)=>{
    const fileName=req.file.filename;
    const {courseId}=req.body;
    try {
        const file=new File({fileName,courseId}); 
        await file.save();  
        res.send({status:'ok'});
    } catch (error) {
        console.log(error);
    }
});

app.get('/get-file/:id',async(req,res)=>{
    const {id}=req.params;
    try {
        const files=await File.find({courseId:id});
        res.send(files);
    } catch (error) {
        console.log(error);
    }
});

app.listen(port,()=>{
    console.log(`listening on ${port}`);
});