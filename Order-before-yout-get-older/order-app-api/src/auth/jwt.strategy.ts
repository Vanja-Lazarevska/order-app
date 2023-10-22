import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as dotenv from 'dotenv';

dotenv.config();

const secret = process.env.API_KEY

export class JwtStrategy extends PassportStrategy(Strategy)   {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret
        })
    }

    async validate(payload: any) {
        console.log('GUARD')
        return {userId: payload.sub, username: payload.username}
    }
}