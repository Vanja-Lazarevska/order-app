import { Controller, Body, Post, UseGuards, Request, Get, Param } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserRegister } from 'src/interfaces/user.interface';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt'
import { LocalAuthGuard } from 'src/auth/guards/local-auth-guard';

@Controller('users')
export class UsersController {
    constructor(
      private readonly userService: UsersService, 
      private readonly authService: AuthService
      ){}


    @Post('/login') 
    @UseGuards(LocalAuthGuard)
     login( @Request() req) {
      return this.authService.login(req.user) 
    }

    @Post('/register')
    async register(@Body() registerCredentials: UserRegister) {
      const {username, password, name, lname} = registerCredentials
      const saltOrRounds = 10
      const hashedPassword = await bcrypt.hash(password, saltOrRounds)
      const newUserToSave = {username, password:hashedPassword, name, lname}
      const newUser = await this.userService.registerUser(newUserToSave)

        return {
            message: 'User is created'
      
        }
      }

      @Get('/:token')
      getUserId (@Param('token') userToken: string) {
        return this.userService.getUserId(userToken)
      }

}
