import {Module} from '@nestjs/common';
import {OrdersController} from './orders.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "@staticPrivate/constants";
import {JwtStrategyService} from "@services/authentitication/jwt-strategy/jwt-strategy.service";
import {Order, OrderSchema} from "@schemas/order";
import {OrdersService} from "@services/orders/orders.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
        })
    ],
    controllers: [OrdersController],
    providers: [
        OrdersService,
        JwtStrategyService
    ],

})
export class OrdersModule {
}
