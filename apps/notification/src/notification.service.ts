import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { USER_SERVICE } from './constants';

@Injectable()
export class NotificationService {
  constructor(@Inject(USER_SERVICE) private client: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }

  async notificarMessage(data) {
    await lastValueFrom(this.client.emit('notification_message', { data }));
    console.log('notificated message');
  }
}
