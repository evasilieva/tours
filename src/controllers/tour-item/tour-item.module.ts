import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Tour, TourSchema} from "@schemas/tour";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "@staticPrivate/constants";
import {ToursService} from "@services/tours/tours.service";
import {JwtStrategyService} from "@services/authentitication/jwt-strategy/jwt-strategy.service";
import {TourItemController} from "@controllers/tour-item/tour-item.controller";
import {MulterModule} from "@nestjs/platform-express";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Tour.name, schema: TourSchema}]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
        }),
        MulterModule.register({
            dest: './public/images',
        })
    ],
    controllers: [TourItemController],
    providers: [
        ToursService,
        JwtStrategyService
    ],
})
export class TourItemModule {

}
