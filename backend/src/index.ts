import express , {Request , Response} from 'express';
import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
import path from 'path';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => {
        console.log('Connected to MongoDB' , process.env.MONGODB_CONNECTION_STRING);
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });


const app = express();
app.use(express.json()) // automatically convert the body of api into json
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
 // cross-origin resource sharing , http-header-based-protocol , enable server to tell which origins can access its resources.
// only allow to this url to connect to server
//and the url must include credentials or http cookies in a request

app.use(express.static(path.join(__dirname , '../../frontend/dist')));
// serve static assests from the frontend/dist folder to our root server


app.use("/api/users" , userRoutes) // when the url is this use the routes
app.use("/api/auth" , authRoutes)

//start server
app.listen(7000 , ()=>{
    console.log('Server is running on port 7000')
})
