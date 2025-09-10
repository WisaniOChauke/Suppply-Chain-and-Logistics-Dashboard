import { AlertTriangle, CheckCircle, Clock } from 'lucide-react'

interface SLAIndicatorProps {
  status: 'ON_TIME' | 'AT_RISK' | 'BREACHED'
  hoursRemaining?: number
  riskScore?: number
}

export function SLAIndicator({ status, hoursRemaining, riskScore }: SLAIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'ON_TIME':
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          color: 'text-green-600 bg-green-50 border-green-200',
          label: 'On Time'
        }
      case 'AT_RISK':
        return {
          icon: <Clock className="h-4 w-4" />,
          color: 'text-orange-600 bg-orange-50 border-orange-200',
          label: 'At Risk'
        }
      case 'BREACHED':
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          color: 'text-red-600 bg-red-50 border-red-200',
          label: 'SLA Breached'
        }
    }
  }

  const config = getStatusConfig()

  return (
    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-sm font-medium ${config.color}`}>
      {config.icon}
      <span>{config.label}</span>
      {hoursRemaining !== undefined && status !== 'BREACHED' && (
        <span className="text-xs">
          ({hoursRemaining}h remaining)
        </span>
      )}
      {riskScore !== undefined && status === 'AT_RISK' && (
        <span className="text-xs">
          Risk: {riskScore}%
        </span>
      )}
    </div>
  )
}