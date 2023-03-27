import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {UsersModule} from '@controllers/users/users.module';
import {ToursModule} from "@controllers/tours/tours.module";
import {OrdersModule} from "@controllers/orders/orders.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TourItemModule} from "@controllers/tour-item/tour-item.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env.local', '.env'],
        }),

        MongooseModule.forRootAsync({
                imports: [ConfigModule],
                useFactory: async (config: ConfigService) => ({
                    uri: config.get('MONGOURL'),
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                }),
                inject: [ConfigService],
            }
        ),
        UsersModule,
        ToursModule,
        OrdersModule,
        TourItemModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
