import {Body, Controller, Get, Post, UseGuards, Request, HttpException, HttpStatus} from '@nestjs/common';
import {OrdersService} from "@services/orders/orders.service";
import {OrderDto} from "@dto/order-dto";
import {JwtAuthGuardService} from "@services/authentitication/jwt-auth.guard/jwt-auth.guard.service";

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {
    }

    @UseGuards(JwtAuthGuardService)
    @Post()
    initOrders(@Body() data: OrderDto, @Request() req) {
        if (data.userId !== req.user.id) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                errorText: "Запрещено создавать заказы от имени другого пользователя"
            }, HttpStatus.FORBIDDEN)
        }

        const OrderDara = new OrderDto(data.age, data.birthDay, data.cardNumber, data.tourId, data.userId);
        return this.ordersService.sendOrder(OrderDara);
    }

    @UseGuards(JwtAuthGuardService)
    @Get()
    getOrders(@Request() req) {
        return this.ordersService.getUserOrders(req.user.id);
    }
}
