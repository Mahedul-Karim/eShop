import Events from "../components/home/Events";
import HomeProducts from "../components/Products/HomeProducts";
import Category from "../components/home/Category";
import Hero from "../components/home/Hero";
import Branding from "../components/home/Branding";
import NewsLetter from "../components/newsletter/NewsLetter";
import FeaturedProducts from "../components/Products/FeaturedProducts";

function Home() {
  return (
    <>
      <Hero />
      <Category />
      <HomeProducts />
      <Events />
      <FeaturedProducts />
      <Branding />
      <NewsLetter />
    </>
  );
}

export default Home;
