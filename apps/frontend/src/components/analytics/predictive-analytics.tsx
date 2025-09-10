'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ETAForecastChart } from './eta-forecast-chart'
import { RiskHeatmap } from './risk-heatmap'
import { PredictionMetrics } from './prediction-metrics'
import { TrendingUp, AlertTriangle, Clock, Target } from 'lucide-react'

export function PredictiveAnalytics() {
  const { data: metrics } = useQuery({
    queryKey: ['prediction-metrics'],
    queryFn: () => fetch(`${process.env.NEXT_PUBLIC_API_URL}/predictions/metrics`).then(r => r.json()),
  })

  const mockMetrics = {
    accuracy: 87.5,
    totalPredictions: 1247,
    correctPredictions: 1091,
    avgDelayPrediction: 23.4,
    modelPerformance: {
      'ETA Model': 87.5,
      'Risk Model': 82.3,
      'Weather Model': 91.2,
    }
  }

  const displayMetrics = metrics || mockMetrics

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{displayMetrics.accuracy}%</p>
                <p className="text-sm text-muted-foreground">Prediction Accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{displayMetrics.totalPredictions}</p>
                <p className="text-sm text-muted-foreground">Total Predictions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{displayMetrics.avgDelayPrediction}m</p>
                <p className="text-sm text-muted-foreground">Avg Delay Prediction</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-muted-foreground">High Risk Shipments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ETAForecastChart />
        <RiskHeatmap />
      </div>

      {/* Model Performance */}
      <PredictionMetrics metrics={displayMetrics} />
    </div>
  )
}