import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-order-request';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrdersRepository) {}

  async createOrder(dto: CreateOrderDTO) {
    return this.orderRepository.create(dto);
  }

  async getOrders() {
    return this.orderRepository.find({});
  }
}
