import Events from "../components/Events";
import HomeProducts from "../components/Products/HomeProducts";
import Category from "../components/layout/Category";
import Hero from "../components/layout/Hero";
import Branding from "../components/Branding";
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
