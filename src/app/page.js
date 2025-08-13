import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import AchievementsSection from "./components/AchievementsSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillSection from "./components/SkillSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <div className="container mx-auto px-2 sm:px-4 lg:px-16 space-y-16 md:space-y-12 py-16">
        <HeroSection />
        <AchievementsSection />
        <AboutSection />
        <SkillSection />
        <ExperienceSection />
        <ProjectsSection />
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}