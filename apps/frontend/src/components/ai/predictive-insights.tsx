'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, TrendingUp, Clock, DollarSign, Zap, Target, RefreshCw, Route
} from 'lucide-react'

interface Insight {
  id: string
  type: 'delay_prediction' | 'cost_optimization' | 'route_suggestion' | 'demand_forecast'
  title: string
  description: string
  confidence: number
  impact: 'high' | 'medium' | 'low'
  savings?: string
  action?: string
}

export function PredictiveInsights() {
  const [insights, setInsights] = useState<Insight[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const mockInsights: Insight[] = [
    {
      id: '1',
      type: 'delay_prediction',
      title: 'Potential Delay Alert',
      description: 'SH-AF-2024-091 may be delayed by 2-3 days due to weather conditions',
      confidence: 87,
      impact: 'high',
      action: 'Notify customer and arrange alternative routing'
    },
    {
      id: '2',
      type: 'cost_optimization',
      title: 'Route Cost Optimization',
      description: 'Alternative route via Suez Canal could save 15% on fuel costs',
      confidence: 92,
      impact: 'medium',
      savings: '$23,400/month'
    }
  ]

  const generateInsights = async () => {
    setIsLoading(true)
    setTimeout(() => {
      setInsights(mockInsights)
      setIsLoading(false)
    }, 2000)
  }

  useEffect(() => {
    generateInsights()
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case 'delay_prediction': return <Clock className="h-5 w-5 text-orange-500" />
      case 'cost_optimization': return <DollarSign className="h-5 w-5 text-green-500" />
      case 'route_suggestion': return <Route className="h-5 w-5 text-blue-500" />
      default: return <TrendingUp className="h-5 w-5 text-purple-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Brain className="h-6 w-6 text-blue-600" />
          AI Predictive Insights
        </h2>
        <Button onClick={generateInsights} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Analyzing...' : 'Refresh'}
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">AI Analysis Status</p>
                <p className="text-sm text-muted-foreground">
                  {isLoading ? 'Processing...' : 'Analysis complete'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">85%</p>
              <p className="text-sm">Confidence</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          [1, 2].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </CardContent>
            </Card>
          ))
        ) : (
          insights.map((insight) => (
            <Card key={insight.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  {getIcon(insight.type)}
                  <CardTitle className="text-base">{insight.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Confidence</span>
                    <span>{insight.confidence}%</span>
                  </div>
                  <Progress value={insight.confidence} className="h-2" />
                </div>
                {insight.savings && (
                  <div className="flex items-center gap-2 p-2 bg-green-50 rounded-md">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">{insight.savings}</span>
                  </div>
                )}
                <Button size="sm" className="w-full">Take Action</Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}