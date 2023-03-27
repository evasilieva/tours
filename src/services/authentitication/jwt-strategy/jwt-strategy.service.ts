import {Injectable} from '@nestjs/common';
import {jwtConstants} from "@staticPrivate/constants";
import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        return {id: payload.id, login: payload.login};
    }

}
