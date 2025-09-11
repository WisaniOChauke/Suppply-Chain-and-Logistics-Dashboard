'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Download, FileText, Table, CheckCircle, Clock
} from 'lucide-react'

interface ExportJob {
  id: string
  name: string
  type: 'csv' | 'excel' | 'pdf'
  status: 'processing' | 'completed'
  progress: number
  size?: string
}

export function DataExport() {
  const [exportJobs, setExportJobs] = useState<ExportJob[]>([
    {
      id: '1',
      name: 'Shipment Report Q4 2024',
      type: 'excel',
      status: 'completed',
      progress: 100,
      size: '2.4 MB'
    }
  ])

  const startExport = (name: string, type: 'csv' | 'excel' | 'pdf') => {
    const newJob: ExportJob = {
      id: Date.now().toString(),
      name,
      type,
      status: 'processing',
      progress: 0
    }
    
    setExportJobs(prev => [newJob, ...prev])
    
    setTimeout(() => {
      setExportJobs(prev => prev.map(job => 
        job.id === newJob.id 
          ? { ...job, status: 'completed', progress: 100, size: '1.8 MB' }
          : job
      ))
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Download className="h-6 w-6 text-blue-600" />
          Data Export Center
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md cursor-pointer" onClick={() => startExport('Shipments Export', 'csv')}>
          <CardContent className="p-4 text-center">
            <Table className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-medium">Export as CSV</h3>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md cursor-pointer" onClick={() => startExport('Analytics Report', 'excel')}>
          <CardContent className="p-4 text-center">
            <Table className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-medium">Export as Excel</h3>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md cursor-pointer" onClick={() => startExport('Executive Summary', 'pdf')}>
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-red-600" />
            <h3 className="font-medium">Export as PDF</h3>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Export History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {exportJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Table className="h-4 w-4" />
                  <div>
                    <p className="font-medium text-sm">{job.name}</p>
                    {job.size && <p className="text-xs text-muted-foreground">{job.size}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {job.status === 'processing' && <Progress value={job.progress} className="w-24 h-2" />}
                  
                  <Badge variant={job.status === 'completed' ? 'default' : 'secondary'}>
                    {job.status}
                  </Badge>

                  {job.status === 'completed' && (
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}