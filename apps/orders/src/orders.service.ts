import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-order-request';
import { OrdersRepository } from './orders.repository';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BILLING_SERVICE, ORDER_CREATED } from '@app/common';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  async createOrder(dto: CreateOrderDTO, authentication: string) {
    const session = await this.orderRepository.startTransaction();

    try {
      const order = await this.orderRepository.create(dto, { session });

      await lastValueFrom(
        this.billingClient.emit(ORDER_CREATED, {
          dto,
          Authentication: authentication,
        }),
      );

      return order;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }

  async getOrders() {
    return this.orderRepository.find({});
  }
}
