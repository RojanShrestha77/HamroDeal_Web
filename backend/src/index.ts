import express, {Application, Request, Response} from 'express'
import { connectDB } from './database/mongodb';
import { PORT } from './configs';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import authRoutes from './routes/auth.routes';

dotenv.config();

console.log(process.env.PORT);

const app = express ();

app.use(bodyParser.json())

app.get("/", (req: Request, res: Response) => {
    res.send("Server is ready");
})

app.use('/api/auth', authRoutes);


async function startServer(){
    await connectDB();
    app.listen(PORT, () => {
        console.log(`server: http://localhost:${PORT}`);
    })

}

startServer();

//this is the index page of the src