import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Order, OrderDocument} from "@schemas/order";

@Injectable()
export class OrdersService {
    constructor(@InjectModel('Order') private orderModel: Model<OrderDocument>) {

    }

    async sendOrder(data): Promise<Order> {
        const orderData = new this.orderModel(data);
        return orderData.save();
    }

    /**
     * Получить все заказы
     * @return {Promise<OrderDocument[]>}
     */
    async getOrders(): Promise<OrderDocument[]> {
        return this.orderModel.find();
    }

    async getUserOrders(userId: string): Promise<OrderDocument[]> {
        return this.orderModel.find({userId: userId});
    }
}
