'use client'

import { useState } from 'react'
import { PredictiveAnalytics } from '@/components/analytics/predictive-analytics'
import { ReportBuilder } from '@/components/analytics/report-builder'
import { PredictiveInsights } from '@/components/ai/predictive-insights'
import { DataExport } from '@/components/export/data-export'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('predictive')

  const tabs = [
    { id: 'predictive', label: 'Predictive Analytics' },
    { id: 'insights', label: 'AI Insights' },
    { id: 'reports', label: 'Report Builder' },
    { id: 'export', label: 'Data Export' }
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Advanced Analytics</h1>
          <p className="text-muted-foreground">Comprehensive analytics and reporting suite</p>
        </div>
        
        <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'predictive' && <PredictiveAnalytics />}
        {activeTab === 'insights' && <PredictiveInsights />}
        {activeTab === 'reports' && <ReportBuilder />}
        {activeTab === 'export' && <DataExport />}
      </main>
    </div>
  )
}