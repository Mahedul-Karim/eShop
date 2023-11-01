import { useDispatch } from "react-redux";
import Events from "../components/Events";
import FeaturedProduct from "../components/Products/FeaturedProduct";
import Category from "../components/layout/Category";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import Branding from '../components/Branding'
import NewsLetter from "../components/newsletter/NewsLetter";


function Home() {
  return (
    <>
      <Header activePage={1} />
      <Hero />
      <Category />
      <FeaturedProduct />
      <Events />
      <Branding />
      <NewsLetter />
      <Footer />
    </>
  );
}

export default Home;
