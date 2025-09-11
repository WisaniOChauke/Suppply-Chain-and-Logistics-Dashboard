'use client'

import { useState, useEffect, createContext, useContext } from 'react'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: Date
  read: boolean
  shipmentId?: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Shipment Delivered',
      message: 'SH-AF-2024-089 delivered to Lagos Port successfully',
      type: 'success',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      shipmentId: 'SH-AF-2024-089'
    },
    {
      id: '2',
      title: 'Weather Delay Alert',
      message: 'SH-AF-2024-091 delayed due to storm conditions',
      type: 'warning',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      shipmentId: 'SH-AF-2024-091'
    },
    {
      id: '3',
      title: 'New Order Received',
      message: 'Bulk order from Dangote Industries - $340K',
      type: 'info',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEvents = [
        { title: 'Shipment Update', message: 'SH-EU-2024-156 cleared customs in Hamburg', type: 'info' as const },
        { title: 'Route Optimization', message: 'New optimal route suggested for Lagos delivery', type: 'success' as const },
        { title: 'Delay Warning', message: 'Potential delay detected on Durban route', type: 'warning' as const }
      ]
      
      if (Math.random() > 0.7) {
        const event = randomEvents[Math.floor(Math.random() * randomEvents.length)]
        addNotification(event)
      }
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider')
  }
  return context
}