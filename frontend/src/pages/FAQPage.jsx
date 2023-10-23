import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import FAQ from "../components/FAQ";

const FAQPage = () => {
    return (
      <>
        <Header activePage={5} />
        <FAQ />
        <Footer />
      </>
    );
  };
export default FAQPage;