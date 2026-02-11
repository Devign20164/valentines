import Hero from '@/components/ui/Hero'
import Timeline from '@/components/ui/Timeline'
import Proposal from '@/components/ui/Proposal'

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Hero />
      <Timeline />
      <Proposal />
    </main>
  )
}
