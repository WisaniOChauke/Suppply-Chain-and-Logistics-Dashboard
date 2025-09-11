'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, X, Calendar, BarChart3, PieChart, LineChart, 
  Download, Filter, Settings, Play 
} from 'lucide-react'

interface ReportField {
  id: string
  name: string
  type: 'dimension' | 'metric'
  category: string
}

export function ReportBuilder() {
  const [selectedFields, setSelectedFields] = useState<ReportField[]>([])
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar')
  const [dateRange, setDateRange] = useState('last_30_days')

  const availableFields: ReportField[] = [
    { id: 'shipment_status', name: 'Shipment Status', type: 'dimension', category: 'Shipments' },
    { id: 'origin_country', name: 'Origin Country', type: 'dimension', category: 'Geography' },
    { id: 'destination_country', name: 'Destination Country', type: 'dimension', category: 'Geography' },
    { id: 'carrier', name: 'Carrier', type: 'dimension', category: 'Logistics' },
    { id: 'customer', name: 'Customer', type: 'dimension', category: 'Business' },
    { id: 'total_shipments', name: 'Total Shipments', type: 'metric', category: 'Volume' },
    { id: 'total_value', name: 'Total Value', type: 'metric', category: 'Financial' },
    { id: 'avg_transit_time', name: 'Avg Transit Time', type: 'metric', category: 'Performance' },
    { id: 'on_time_delivery', name: 'On-Time Delivery %', type: 'metric', category: 'Performance' }
  ]

  const addField = (field: ReportField) => {
    if (!selectedFields.find(f => f.id === field.id)) {
      setSelectedFields([...selectedFields, field])
    }
  }

  const removeField = (fieldId: string) => {
    setSelectedFields(selectedFields.filter(f => f.id !== fieldId))
  }

  const generateReport = () => {
    console.log('Generating report with:', { selectedFields, chartType, dateRange })
  }

  const exportReport = (format: 'csv' | 'excel' | 'pdf') => {
    console.log(`Exporting report as ${format}`)
  }

  return (
    <div className="space-y-6">
      {/* Report Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Field Selection */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Report Fields
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Selected Fields */}
              <div>
                <h4 className="font-medium mb-2">Selected Fields</h4>
                <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md bg-muted/30">
                  {selectedFields.map((field) => (
                    <Badge key={field.id} variant="secondary" className="flex items-center gap-1">
                      {field.name}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0"
                        onClick={() => removeField(field.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                  {selectedFields.length === 0 && (
                    <p className="text-sm text-muted-foreground">Drag fields here or click to add</p>
                  )}
                </div>
              </div>

              {/* Available Fields */}
              <div>
                <h4 className="font-medium mb-2">Available Fields</h4>
                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                  {availableFields.map((field) => (
                    <Button
                      key={field.id}
                      variant="outline"
                      size="sm"
                      className="justify-start h-auto p-2"
                      onClick={() => addField(field)}
                      disabled={selectedFields.some(f => f.id === field.id)}
                    >
                      <div className="text-left">
                        <div className="font-medium text-xs">{field.name}</div>
                        <div className="text-xs text-muted-foreground">{field.category}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chart & Export Options */}
        <Card>
          <CardHeader>
            <CardTitle>Visualization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Chart Type */}
            <div>
              <h4 className="font-medium mb-2">Chart Type</h4>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={chartType === 'bar' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('bar')}
                  className="flex flex-col items-center p-2 h-auto"
                >
                  <BarChart3 className="h-4 w-4 mb-1" />
                  <span className="text-xs">Bar</span>
                </Button>
                <Button
                  variant={chartType === 'line' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('line')}
                  className="flex flex-col items-center p-2 h-auto"
                >
                  <LineChart className="h-4 w-4 mb-1" />
                  <span className="text-xs">Line</span>
                </Button>
                <Button
                  variant={chartType === 'pie' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('pie')}
                  className="flex flex-col items-center p-2 h-auto"
                >
                  <PieChart className="h-4 w-4 mb-1" />
                  <span className="text-xs">Pie</span>
                </Button>
              </div>
            </div>

            {/* Date Range */}
            <div>
              <h4 className="font-medium mb-2">Date Range</h4>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
              >
                <option value="last_7_days">Last 7 Days</option>
                <option value="last_30_days">Last 30 Days</option>
                <option value="last_90_days">Last 90 Days</option>
                <option value="last_year">Last Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button onClick={generateReport} className="w-full" disabled={selectedFields.length === 0}>
                <Play className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              
              <div className="grid grid-cols-3 gap-1">
                <Button variant="outline" size="sm" onClick={() => exportReport('csv')}>
                  CSV
                </Button>
                <Button variant="outline" size="sm" onClick={() => exportReport('excel')}>
                  Excel
                </Button>
                <Button variant="outline" size="sm" onClick={() => exportReport('pdf')}>
                  PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Report Preview</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedFields.length > 0 ? (
            <div className="space-y-4">
              <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Chart preview will appear here</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedFields.length} field(s) selected • {chartType} chart • {dateRange}
                  </p>
                </div>
              </div>
              
              {/* Sample Data Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      {selectedFields.slice(0, 4).map((field) => (
                        <th key={field.id} className="p-2 text-left font-medium">
                          {field.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-2">Sample Data</td>
                      <td className="p-2">Preview</td>
                      <td className="p-2">Will Show</td>
                      <td className="p-2">Here</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="h-32 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Select fields to preview your report</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}