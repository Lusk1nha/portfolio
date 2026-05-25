import { Hero } from '@/presentation/sections/Hero/Hero'
import { FeaturedProjects } from '@/presentation/sections/FeaturedProjects/FeaturedProjects'
import { ExperienceTimeline } from '@/presentation/sections/ExperienceTimeline/ExperienceTimeline'
import { StackGrid } from '@/presentation/sections/StackGrid/StackGrid'
import { ContactSection } from '@/presentation/sections/ContactSection/ContactSection'

export function HomePage() {
  return (
    <>
      <Hero />
      <div className="border-t border-[var(--border)]">
        <FeaturedProjects />
      </div>
      <div className="border-t border-[var(--border)]">
        <ExperienceTimeline compact />
      </div>
      <div className="border-t border-[var(--border)]">
        <StackGrid compact />
      </div>
      <div className="border-t border-[var(--border)]">
        <ContactSection />
      </div>
    </>
  )
}
