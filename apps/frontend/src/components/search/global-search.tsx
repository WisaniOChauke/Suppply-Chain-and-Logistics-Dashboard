'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, X, Package, Truck, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface SearchResult {
  id: string
  type: 'shipment' | 'order' | 'customer' | 'supplier'
  title: string
  subtitle: string
  status?: string
}

export function GlobalSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const mockResults: SearchResult[] = [
    { id: 'SH-AF-2024-089', type: 'shipment', title: 'SH-AF-2024-089', subtitle: 'Shanghai → Lagos', status: 'IN_TRANSIT' },
    { id: 'SH-AF-2024-091', type: 'shipment', title: 'SH-AF-2024-091', subtitle: 'Hamburg → Cape Town', status: 'DELAYED' },
    { id: 'ORD-2024-156', type: 'order', title: 'ORD-2024-156', subtitle: 'Dangote Industries', status: 'PROCESSING' },
    { id: 'dangote', type: 'customer', title: 'Dangote Industries', subtitle: 'Lagos, Nigeria' }
  ]

  useEffect(() => {
    if (query.length > 0) {
      const filtered = mockResults.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query])

  const getIcon = (type: string) => {
    switch (type) {
      case 'shipment': return <Package className="h-4 w-4 text-blue-500" />
      case 'order': return <Truck className="h-4 w-4 text-green-500" />
      default: return <Users className="h-4 w-4 text-purple-500" />
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search shipments, orders, customers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        />
        {query && (
          <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0" onClick={() => setQuery('')}>
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-input rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
          {results.map((result) => (
            <div key={result.id} className="p-3 hover:bg-muted cursor-pointer border-b last:border-b-0">
              <div className="flex items-center gap-3">
                {getIcon(result.type)}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{result.title}</p>
                    {result.status && (
                      <Badge variant="secondary" className="text-xs">{result.status}</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{result.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}