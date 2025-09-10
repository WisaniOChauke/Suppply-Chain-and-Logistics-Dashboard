import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown } from 'lucide-react'

export function ETAForecastChart() {
  const mockData = [
    { date: '2024-01-15', predicted: 95, actual: 92, accuracy: 97 },
    { date: '2024-01-16', predicted: 87, actual: 89, accuracy: 98 },
    { date: '2024-01-17', predicted: 102, actual: 98, accuracy: 96 },
    { date: '2024-01-18', predicted: 78, actual: 82, accuracy: 95 },
    { date: '2024-01-19', predicted: 91, actual: 88, accuracy: 97 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5" />
          <span>ETA Forecast Accuracy</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Mock Chart Visualization */}
          <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                ETA Prediction Chart
              </h3>
              <p className="text-muted-foreground text-sm max-w-md">
                Time series visualization showing predicted vs actual ETAs
                with accuracy trends over time
              </p>
            </div>
          </div>
          
          {/* Recent Predictions */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Recent Predictions</h4>
            {mockData.slice(-3).map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span className="text-sm">{item.date}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {item.predicted}m → {item.actual}m
                  </span>
                  <span className={`text-sm font-medium ${
                    item.accuracy >= 96 ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {item.accuracy}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}