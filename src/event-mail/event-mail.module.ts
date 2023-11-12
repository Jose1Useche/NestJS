import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { User } from 'src/users/schemas/user.schema';

@Module({})
export class EventMailModule {
    @OnEvent('user.created')
    handleUserCreatedEvent(user: User) {
        console.log('Event Listener: ', user);
    }
}
