import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'

import authdata from './routes/auth.js';


const app = express();

dotenv.config()



app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());



app.use('/',  authdata);

// put url a name check pronlem in connection url
//const  = 'mongodb+srv://akingz2000:08071434751@nodeexpressproject.hqbuq.mongodb.net/?retryWrites=true&w=majority';
const PORT =  5000;

mongoose.connect(process.env.CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

 

