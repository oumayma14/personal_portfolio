import { Navbar }          from "../components/Navbar";
import { HeroSection }     from "../components/HeroSection";
import { AboutMe }         from "../components/AboutMe";
import { SkillsSection }   from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection }  from "../components/ContactSection";
import { Footer }          from "../components/Footer";
import { StarBackground }  from "../components/StarBackground";

const Home = () => (
  <>
    <StarBackground />
    <Navbar />
    <main>
      <HeroSection />
      <AboutMe />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
    <Footer />
  </>
);

export default Home;