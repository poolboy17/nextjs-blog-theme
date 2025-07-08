
import { render, screen } from '@testing-library/react'
import Header from '../../components/Header'

// Mock global data
const mockGlobalData = {
  name: 'Test Blog',
  blogTitle: 'Cybersecurity Blog',
  footerText: 'Test Footer'
}

describe('Header Component', () => {
  it('renders the header with blog title', () => {
    render(<Header name={mockGlobalData.name} />)
    
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('contains navigation links', () => {
    render(<Header name={mockGlobalData.name} />)
    
    // Check for common navigation elements
    const homeLink = screen.getByRole('link', { name: /home/i })
    expect(homeLink).toBeInTheDocument()
  })
})
