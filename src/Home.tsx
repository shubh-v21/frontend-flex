import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ProjectSection from "./components/ProjectSection";

const Home = () => {
  // Create more sample projects to demonstrate pagination

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <ProjectSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Home;
