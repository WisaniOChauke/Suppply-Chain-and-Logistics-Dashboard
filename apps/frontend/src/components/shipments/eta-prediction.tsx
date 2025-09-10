import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, TrendingUp, AlertTriangle } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface ETAPredictionProps {
  shipmentId: string
}

export function ETAPrediction({ shipmentId }: ETAPredictionProps) {
  const { data: forecast } = useQuery({
    queryKey: ['eta-forecast', shipmentId],
    queryFn: () => fetch(`${process.env.NEXT_PUBLIC_API_URL}/predictions/eta/${shipmentId}`).then(r => r.json()),
  })

  const { data: risk } = useQuery({
    queryKey: ['risk-assessment', shipmentId],
    queryFn: () => fetch(`${process.env.NEXT_PUBLIC_API_URL}/predictions/risk/${shipmentId}`).then(r => r.json()),
  })

  // Mock data for demo
  const mockForecast = {
    originalETA: '2024-01-25T14:00:00Z',
    predictedETA: '2024-01-25T16:30:00Z',
    confidence: 87,
    delayMinutes: 150,
    factors: ['WEATHER', 'TRAFFIC'],
  }

  const mockRisk = {
    overallRisk: 65,
    riskLevel: 'MEDIUM',
    factors: [
      { type: 'WEATHER', impact: 'MEDIUM', probability: 70 },
      { type: 'TRAFFIC', impact: 'LOW', probability: 40 },
    ],
    recommendations: [
      'Monitor weather conditions',
      'Consider alternative routing',
    ],
  }

  const displayForecast = forecast || mockForecast
  const displayRisk = risk || mockRisk

  const getRiskColor = (level: string) => {
    const colors = {
      LOW: 'text-green-600 bg-green-50 border-green-200',
      MEDIUM: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      HIGH: 'text-orange-600 bg-orange-50 border-orange-200',
      CRITICAL: 'text-red-600 bg-red-50 border-red-200',
    }
    return colors[level as keyof typeof colors] || colors.MEDIUM
  }

  return (
    <div className="space-y-4">
      {/* ETA Prediction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>ETA Prediction</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Original ETA</p>
                <p className="font-medium">{formatDate(displayForecast.originalETA)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Predicted ETA</p>
                <p className="font-medium text-orange-600">{formatDate(displayForecast.predictedETA)}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Delay Prediction</p>
                <p className="font-medium text-red-600">+{displayForecast.delayMinutes} minutes</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Confidence</p>
                <p className="font-medium">{displayForecast.confidence}%</p>
              </div>
            </div>
            
            {displayForecast.factors.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Contributing Factors</p>
                <div className="flex flex-wrap gap-2">
                  {displayForecast.factors.map((factor: string) => (
                    <span key={factor} className="px-2 py-1 bg-muted rounded text-xs">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Risk Assessment</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Risk</p>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold">{displayRisk.overallRisk}%</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskColor(displayRisk.riskLevel)}`}>
                    {displayRisk.riskLevel}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Risk Factors</p>
              <div className="space-y-2">
                {displayRisk.factors.map((factor: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span className="text-sm">{factor.type}</span>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground">{factor.probability}% probability</span>
                      <p className="text-xs font-medium">{factor.impact} impact</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {displayRisk.recommendations.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Recommendations</p>
                <ul className="text-sm space-y-1">
                  {displayRisk.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-blue-600">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}