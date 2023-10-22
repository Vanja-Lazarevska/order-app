import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { IUser, User, UserRegister, UserToSave } from 'src/interfaces/user.interface';
import { Repository } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const secret = process.env.API_KEY

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UsersEntity) private readonly userRepository: Repository<IUser>, 
    private readonly jwtService: JwtService
    ) {}


    async findOne(username: string){
        const userFound = await this.userRepository.findOneBy({
            username: username
        }) 
        return userFound
    }

    async registerUser(userCredentials: UserRegister) {
        const newUser = this.userRepository.create(userCredentials)
        const userSaved = await this.userRepository.save(newUser)

    }

    getUserId (token: string) {
        const userToken = this.jwtService.verify(token, {secret: secret})
        if(userToken) {
            return userToken.sub
        } else {
            return null
        }
    }

    async findUserById (id: number) {
        const user = await this.userRepository.findOneBy({id: id})
        return user
    }

}
