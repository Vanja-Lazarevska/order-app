import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

dotenv.config();

const secret = process.env.API_KEY

@Module({
  imports: [
    PassportModule,
    forwardRef(()=> UsersModule),
    JwtModule.register({
    secret: secret,
    signOptions: {expiresIn: '60s'}
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
