import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@app/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/create-order-request';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() request: CreateOrderDTO, @Req() req: any) {
    return this.ordersService.createOrder(request, req.cookies?.Authentication);
  }

  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }
}
