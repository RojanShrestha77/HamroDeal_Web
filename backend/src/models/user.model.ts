import mongoose, {Schema} from "mongoose";
import { UserType } from "../types/user.types";

const userMongoSchema: Schema = new Schema(
    {
        firstName: {type: String, required: false},
        lastName: {type: String},
        email: {type: String, required: true, unique: true},
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        role: {type: String, enum: ["user", "admin"],default:"user"},


        
    },
    {
        timestamps: true,
    }

)

export interface IUser extends UserType, Document {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    

}

export const UserModel = mongoose.model<IUser>("User", userMongoSchema);