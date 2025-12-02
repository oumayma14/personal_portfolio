import { AboutMe } from "../components/AboutMe";
import { HeroSection } from "../components/HeroSection";
import { Navbar } from "../components/Navbar";
import { StarBackground } from "../components/StarBAckground";
import { ThemeToggle } from "../components/ThemeToggle";

export const Home = () =>{
    return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Theme Toggle */}
        <ThemeToggle />
        <StarBackground />
        <Navbar />
        <main>
            <HeroSection />
            <AboutMe/>
        </main>
    </div>    
    );
};