import { Request, Response,NextFunction } from "express";
import { IUser } from "../models/user.model";
import { UserRepository } from "../repositories/user.repositories";
import jwt from 'jsonwebtoken';
import { HttpError } from "../errors/http-error";
import { JWT_SCERET } from "../configs";

//Middlewear
declare global {
    namespace Express {
        interface Request {
            user?: Record < string, any> | IUser
        }
    }
} // addingtag(user) to request, can use req.user
let userRepository = new UserRepository();



export const authorizedMiddleware = 
async(req: Request, res: Response, next: NextFunction) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || authHeader.startsWith('Bearer'))
            throw new HttpError(401, 'Unauhtorized JWT Invalid');
        const token = authHeader.split('')[1]
        const decodedToken = jwt.verify(token, JWT_SCERET) as Record<string, any>;
        if(!decodedToken || decodedToken.id){
            throw new HttpError(401, "Unauthorized JWT Unverified");
        }
        const user = await userRepository.getUserByID(decodedToken.id);
        if(!user) throw  new HttpError(401, 'unauthorized user not found');
        req.user = user;
        next();


    }catch(err: Error | any){
        return res.status(err.statusCode || 500).json(
            {success: false, message: err.message}
        )

    }

}
        
