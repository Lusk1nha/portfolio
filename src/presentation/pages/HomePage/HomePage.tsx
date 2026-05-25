import { Hero } from "@/presentation/sections/Hero/Hero"
import { FeaturedProjects } from "@/presentation/sections/FeaturedProjects/FeaturedProjects"
import { ExperienceTimeline } from "@/presentation/sections/ExperienceTimeline/ExperienceTimeline"
import { StackGrid } from "@/presentation/sections/StackGrid/StackGrid"
import { ContactSection } from "@/presentation/sections/ContactSection/ContactSection"
import { useSeo } from "@/presentation/hooks/useSeo"

export function HomePage() {
  useSeo({ path: "/" })
  return (
    <>
      <Hero />
      <div className="border-t border-(--border)">
        <FeaturedProjects />
      </div>
      <div className="border-t border-(--border)">
        <ExperienceTimeline compact />
      </div>
      <div className="border-t border-(--border)">
        <StackGrid compact />
      </div>
      <div className="border-t border-(--border)">
        <ContactSection />
      </div>
    </>
  )
}
