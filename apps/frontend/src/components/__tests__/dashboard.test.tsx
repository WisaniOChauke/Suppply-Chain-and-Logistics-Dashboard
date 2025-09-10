import { render, screen } from '@testing-library/react'
import { KPICards } from '@/components/dashboard/kpi-cards'

describe('Dashboard Components', () => {
  test('renders KPI cards', () => {
    render(<KPICards />)
    expect(screen.getByText('Total Shipments')).toBeInTheDocument()
  })
})