import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE } from 'apps/notification/src/constants';

@Injectable()
export class MessageService {
  constructor(@Inject(NOTIFICATION_SERVICE) private client: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }

  async sendMessage(data: any) {
    this.client.emit('send_message', data);
    console.log('sending message');

    return { message: 'send message success full' };
  }
}
