import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt'
import { UsersEntity } from 'src/entities/users.entity';
dotenv.config();

const secret = process.env.API_KEY

@Injectable()
export class AuthService {


    constructor(
        private readonly usersService: UsersService, 
        private readonly jwtService: JwtService
        ){}

    async validateUser(username: string, password: string){
        console.log('authservice',username, password)
    
        const user = await this.usersService.findOne(username)

        if(!user) return null
        const passwordValid = await bcrypt.compare(password, user.password)

        if(user && passwordValid){
        return user
    }
     return null
}

 login(user: UsersEntity) {
    const payload = {username: user.username, sub:user.id}
    const token = this.jwtService.sign(payload)
    return {
        access_token: token
    }

}


 validateToken(token: string) {
    return this.jwtService.verify(token);
}
}
