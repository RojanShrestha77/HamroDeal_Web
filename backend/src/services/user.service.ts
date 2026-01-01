import { CreateUserDto, LoginUserDto } from "../dtos/user.dto";
import { HttpError } from "../errors/http-error";
import { UserRepository } from "../repositories/user.repositories";
import bcryptjs from "bcryptjs";


let userRepository = new UserRepository();

export class UserService {
    async registerUser(userData: CreateUserDto){
        const checkEmail = await userRepository.getUserByEmail(userData.email);
        if (checkEmail) {
            throw new HttpError(409, "Email already in use")
        }

        const checkUsername = await userRepository.getUserByUsername(userData.username);
        if (checkUsername){
            throw new HttpError(403, "Username already in use")
        }

      
        
        const hashedPassword = await bcryptjs.hash(userData.password, 10);
        userData.password = hashedPassword;
        const newUser = await userRepository.createUser(userData);
        return newUser;
    }

    async loginUser(loginData: LoginUserDto){
        const user = await userRepository.getUserByEmail(loginData.email);
        if(!user){
            throw new HttpError(404, "User not found");

        }
        const validPassword = await bcryptjs.compare(loginData.password, user.password);
        //compare plain password with hashed password
        // not loginData.password(client) == user.password(database)
        if(!validPassword){
            throw new HttpError(401, "Invalid credentials");
        }
        
    }
    
}

