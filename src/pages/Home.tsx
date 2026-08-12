import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Skills } from '../sections/Skills';
import { Hobbies } from '../sections/Hobbies';
import { Projects } from '../sections/Projects';
import { Experience } from '../sections/Experience';
import { Contact } from '../sections/Contact';
import { CustomCursor } from '../components/ui/CustomCursor';
import { SplashScreen } from '../components/ui/SplashScreen';
import { AnimatedGridBackground } from '../components/ui/animated-grid-background';

const Home = () => {
  return (
    <>
      <SplashScreen />
      <CustomCursor />

      {/* Fixed animated grid — sits behind ALL content at z-index -1 */}
      <AnimatedGridBackground numSquares={80} maxOpacity={0.9} duration={3} />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Hobbies />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;
