import {Module} from '@nestjs/common';
import {ToursController} from '@controllers/tours/tours.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "@staticPrivate/constants";
import {Tour, TourSchema} from "@schemas/tour";
import {JwtStrategyService} from "@services/authentitication/jwt-strategy/jwt-strategy.service";
import {ToursService} from "@services/tours/tours.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Tour.name, schema: TourSchema}]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
        })
    ],
    controllers: [ToursController],
    providers: [
        ToursService,
        JwtStrategyService
    ],
})
export class ToursModule {
}
