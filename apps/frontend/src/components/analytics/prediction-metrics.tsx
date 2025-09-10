import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3 } from 'lucide-react'

interface PredictionMetricsProps {
  metrics: {
    accuracy: number
    totalPredictions: number
    correctPredictions: number
    avgDelayPrediction: number
    modelPerformance: Record<string, number>
  }
}

export function PredictionMetrics({ metrics }: PredictionMetricsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5" />
          <span>Model Performance</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Model Accuracy */}
          <div>
            <h4 className="font-medium mb-3">Model Accuracy</h4>
            <div className="space-y-3">
              {Object.entries(metrics.modelPerformance).map(([model, accuracy]) => (
                <div key={model} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{model}</span>
                    <span className="font-medium">{accuracy}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${accuracy}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Performance Stats */}
          <div>
            <h4 className="font-medium mb-3">Performance Statistics</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Predictions</span>
                <span className="font-medium">{metrics.totalPredictions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Correct Predictions</span>
                <span className="font-medium">{metrics.correctPredictions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Error Rate</span>
                <span className="font-medium">
                  {((1 - metrics.accuracy / 100) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg Prediction Error</span>
                <span className="font-medium">{metrics.avgDelayPrediction}min</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}