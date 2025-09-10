import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'

export function RiskHeatmap() {
  const riskData = [
    { route: 'Asia-Pacific', risk: 85, shipments: 234 },
    { route: 'Trans-Atlantic', risk: 45, shipments: 156 },
    { route: 'Europe-Asia', risk: 67, shipments: 189 },
    { route: 'Americas', risk: 32, shipments: 98 },
  ]

  const getRiskColor = (risk: number) => {
    if (risk >= 70) return 'bg-red-500'
    if (risk >= 50) return 'bg-orange-500'
    if (risk >= 30) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5" />
          <span>Risk Assessment Heatmap</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Mock Heatmap */}
          <div className="h-64 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 h-full">
              {riskData.map((item, index) => (
                <div key={index} className="relative">
                  <div 
                    className={`h-full rounded-lg ${getRiskColor(item.risk)} opacity-70 flex items-center justify-center`}
                  >
                    <div className="text-center text-white">
                      <p className="font-semibold text-sm">{item.route}</p>
                      <p className="text-xs">{item.risk}% Risk</p>
                      <p className="text-xs">{item.shipments} shipments</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Risk Legend */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Low (0-30%)</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span>Medium (30-50%)</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span>High (50-70%)</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Critical (70%+)</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}