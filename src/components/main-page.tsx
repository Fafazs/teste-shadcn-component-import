'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type SectionKey = 'section1' | 'section2' | 'section3'

interface SectionProps {
  title: string
}

const Section: React.FC<SectionProps> = ({ title }) => {
  return <div className="bg-primary/10 p-4 rounded">{title}</div>
}

const sections: Record<SectionKey, React.ReactNode> = {
  section1: <Section title="Content for Section 1" />,
  section2: <Section title="Content for Section 2" />,
  section3: <Section title="Content for Section 3" />,
}

export function MainPage() {
  const [activeSection, setActiveSection] = useState<SectionKey>('section1')
  const [showFooter, setShowFooter] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY
      const pageHeight = document.documentElement.offsetHeight
      const offset = 50 // Adjust this value to change when the footer appears

      setShowFooter(scrollPosition > pageHeight - offset)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 bg-background shadow-md z-10 p-4">
        <nav className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Website</h1>
          <Input className="w-64" placeholder="Search..." />
        </nav>
      </header>

      <main className="flex-grow p-4">
        <div className="mb-4 space-x-2">
          {(Object.keys(sections) as SectionKey[]).map((key) => (
            <Button
              key={key}
              onClick={() => setActiveSection(key)}
              variant={activeSection === key ? 'default' : 'outline'}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Button>
          ))}
        </div>

        <div className="mt-4">
          {sections[activeSection]}
        </div>

        {/* Add extra content to enable scrolling */}
        <div className="h-[200vh]"></div>
      </main>

      {showFooter && (
        <footer className="bg-muted p-4 text-center">
          <p>&copy; 2023 My Website. All rights reserved.</p>
        </footer>
      )}
    </div>
  )
}