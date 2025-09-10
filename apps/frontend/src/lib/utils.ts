import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function getStatusColor(status: string) {
  const colors = {
    DELIVERED: 'text-status-success bg-status-success/10',
    IN_TRANSIT: 'text-status-info bg-status-info/10',
    EXCEPTION: 'text-status-error bg-status-error/10',
    CREATED: 'text-muted-foreground bg-muted',
  }
  return colors[status as keyof typeof colors] || 'text-muted-foreground bg-muted'
}