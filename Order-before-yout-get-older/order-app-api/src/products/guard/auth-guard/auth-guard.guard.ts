import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as dotenv from 'dotenv';
import { AuthService } from 'src/auth/auth.service';

dotenv.config();

const secret = process.env.API_KEY

@Injectable()
export class AuthGuardGuard implements CanActivate {

  constructor( private readonly authService: AuthService){}

    canActivate(context: ExecutionContext):boolean {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = this.authService.validateToken(token)
      request['user'] = payload;

    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.header('Authorization').split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

