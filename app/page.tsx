"use client"
import BookingWidget from "@/components/booking-widget"
import Footer from "@/components/footer"
import Header from "@/components/header"
import Hero from "@/components/hero"
import QuickPeekSection from "@/components/quick-peek-section"
import StorySection from "@/components/story-section"
import MeetingsEventsSection from "@/components/meetings-events-section"
import GallerySectionComponent from "@/components/gallery-section" // Renamed component
import WhatsappPopup from "@/components/whatsapp-popup"
import WhatsappButton from "@/components/whatsapp-button"
import BrandValuesSection from "@/components/brand-values-section"
import ExploreSection from "@/components/explore-section"
import OffersSection from "@/components/offers-section"
import AwardsSection from "@/components/awards-section" // Declared the variable

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <BookingWidget />
        <QuickPeekSection />
        <StorySection />
        <OffersSection />
        <ExploreSection />
        <MeetingsEventsSection />
        <GallerySectionComponent />
        <BrandValuesSection />
        <AwardsSection />
      </main>
      <Footer />
      <WhatsappPopup />
      <WhatsappButton />
    </div>
  )
}
