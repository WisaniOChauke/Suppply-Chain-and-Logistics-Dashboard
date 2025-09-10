import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentsModule } from './modules/shipments/shipments.module';
import { EventsModule } from './modules/events/events.module';
import { WebSocketModule } from './modules/websocket/websocket.module';
import { ExceptionsModule } from './modules/exceptions/exceptions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'supply_chain',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    ShipmentsModule,
    EventsModule,
    WebSocketModule,
    ExceptionsModule,
  ],
})
export class AppModule {}