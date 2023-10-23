import { useDispatch } from "react-redux";
import Events from "../components/Events";
import FeaturedProduct from "../components/Products/FeaturedProduct";
import { useHttp } from "../components/hooks/useHttp";
import BestDeals from "../components/layout/BestDeals";
import Category from "../components/layout/Category";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import Sponsored from "../components/layout/Sponsored";


function Home() {

  

  return (
    <>
      <Header activePage={1} />
      <Hero />
      <Category />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Sponsored />
      <Footer />
    </>
  );
}

export default Home;
