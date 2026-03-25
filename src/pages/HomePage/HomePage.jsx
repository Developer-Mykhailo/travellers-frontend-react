import About from '../../components/About/About';
import Hero from '../../components/Hero/Hero';
import Join from '../../components/Join/Join';
import OurTravellers from '../../components/OurTravellers/OurTravellers';
import Popular from '../../components/PopularStories/Popular';

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Popular />
      <OurTravellers />
      <Join />
    </>
  );
};

export default HomePage;
