import { TopBar } from "@/components/top-bar";
import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { StatsBar } from "@/components/stats-bar";
import { CoursesSection } from "@/components/courses-section";
import { AboutSection } from "@/components/about-section";
import { NewsSection } from "@/components/news-section";
import { CtaSection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <TopBar /> */}
      <SiteHeader />
      <main>
        <HeroSection />
        <StatsBar />
        <CoursesSection />
        <AboutSection />
        <NewsSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
