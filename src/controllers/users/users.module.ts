import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {UsersController} from "@controllers/users/users.controller";
import {UsersService} from "@services/users/users.service";
import {User, UserSchema} from "@schemas/user";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "@staticPrivate/constants";
import {AuthService} from "@services/authentitication/auth/auth.service";
import {JwtStrategyService} from "@services/authentitication/jwt-strategy/jwt-strategy.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            // signOptions: {expiresIn: '60s'}
        })
    ],
    controllers: [UsersController],
    providers: [
        UsersService,
        AuthService,
        JwtStrategyService
    ],
})
export class UsersModule {
}
