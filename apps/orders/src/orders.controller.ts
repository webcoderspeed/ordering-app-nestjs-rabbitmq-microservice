import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/create-order-request';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getHello() {
    return 'Hello';
  }

  @Post()
  async createOrder(@Body() dto: CreateOrderDTO) {
    return this.ordersService.createOrder(dto);
  }
}
