import express, {Application, Request, Response} from 'express'
import { connectDB } from './database/mongodb';
import { PORT } from './configs';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import authRoutes from './routes/auth.routes';
import adminUserRoutes from './routes/admin/user.route'
import sellerRoutes from './routes/seller/seller.route'
import cors from 'cors';

dotenv.config();

console.log(process.env.PORT);

const app = express ();

// connectin the frontend  to the backend
// decide the list of the accepted domain
// domain of the frontend
let corsOptions  = {
    origin: ["http://localhost:3000", "http://localhost:3003"]
    // list of accepted domain

}
// origin: '*', //accept all
app.use(cors(corsOptions))
app.use(bodyParser.json())

app.get("/", (req: Request, res: Response) => {
    res.send("Server is ready");
})

app.use('/api/auth', authRoutes);

app.use('/api/admin/users', adminUserRoutes);
app.use('/api/seller', sellerRoutes);


async function startServer(){
    await connectDB();
    app.listen(PORT, () => {
        console.log(`server: http://localhost:${PORT}`);
    })

}

startServer();

