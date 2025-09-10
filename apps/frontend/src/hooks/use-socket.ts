'use client'

import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export function useSocket(shipmentId?: string) {
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001')
    }

    if (shipmentId) {
      socket.emit('join-shipment', shipmentId)

      socket.on('shipment-update', (data) => {
        queryClient.invalidateQueries({ queryKey: ['shipment', shipmentId] })
        queryClient.invalidateQueries({ queryKey: ['events', shipmentId] })
      })

      socket.on('status-update', (data) => {
        if (data.shipmentId === shipmentId) {
          queryClient.invalidateQueries({ queryKey: ['shipment', shipmentId] })
        }
      })
    }

    return () => {
      if (shipmentId && socket) {
        socket.emit('leave-shipment', shipmentId)
        socket.off('shipment-update')
        socket.off('status-update')
      }
    }
  }, [shipmentId, queryClient])

  return socket
}