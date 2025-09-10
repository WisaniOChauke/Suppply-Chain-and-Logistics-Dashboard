import {
  WebSocketGateway as WSGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WSGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
})
export class WebSocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join-shipment')
  handleJoinShipment(
    @MessageBody() shipmentId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`shipment-${shipmentId}`);
    return { event: 'joined-shipment', data: shipmentId };
  }

  @SubscribeMessage('leave-shipment')
  handleLeaveShipment(
    @MessageBody() shipmentId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(`shipment-${shipmentId}`);
    return { event: 'left-shipment', data: shipmentId };
  }

  broadcastShipmentUpdate(shipmentId: string, data: any) {
    this.server.to(`shipment-${shipmentId}`).emit('shipment-update', data);
  }

  broadcastStatusUpdate(shipmentId: string, status: string) {
    this.server.to(`shipment-${shipmentId}`).emit('status-update', { shipmentId, status });
  }
}