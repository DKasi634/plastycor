import AboutSection from '@/components/about-section/about-section.component'
import AchievementsSection from '@/components/achievements-section/achievements-section.component'
import ActivitiesSection from '@/components/activities-section/activities-section.component'
import { ContactSection } from '@/components/contacts-section/contacts-section.component'
import { CTASection } from '@/components/cta-section/cta-section.component'
import HomeHero from '@/components/home-hero/home-hero.component'
import TeamSection from '@/components/team-section/team-section.component'
import { YouTubePlayer } from '@/components/youtube-player/youtube-player.component'


const LandingPage = () => {

    const youtubeVideoId = "Ln09F8ElLT4"
  return (
    <div className="flex flex-col">
        <HomeHero />
        <AboutSection />
        <TeamSection/>
        <AchievementsSection />
        <ActivitiesSection />
        <YouTubePlayer videoId={youtubeVideoId} />
        <CTASection />
        <ContactSection />
    </div>
  )
}

export default LandingPage