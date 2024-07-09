import React from "react";
import Container from "../../util/Container";
import Heading from "../ui/Heading";

const FeaturedDetails = ({ title, paragraph }) => {
  return (
    <div className="absolute h-[120px] bottom-0 w-full bg-gradient-to-t from-black from-25% flex flex-col justify-center pl-5 transition-all duration-300 translate-y-[100%] group-hover:translate-y-0">
      <h4 className="text-white font-semibold text-lg">{title}</h4>
      <p className="text-[#FAFAFA] text-xs max-w-[250px]">{paragraph}</p>
    </div>
  );
};

const FeaturedProducts = () => {
  return (
    <Container styles={"my-4"}>
      <Heading>Featured</Heading>
      <h3 className="my-3 text-[24px] font-semibold">New Arrival</h3>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_0.8fr] gap-5">
        <div className='h-[250px] sm:h-[450px] rounded-md overflow-clip bg-slate-100 bg-[url("/assets/frame705.png")] bg-contain bg-no-repeat bg-right relative group'>
          <FeaturedDetails
            title={"Playstation 5"}
            paragraph={"Black and White version of the PS5 coming out on sale."}
          />
        </div>
        <div className="grid grid-cols-2 h-[200px] sm:h-auto sm:grid-cols-1 gap-5">
          <div className='bg-slate-100 bg-[url("/assets/frame707.png")] bg-[length:100px_auto] sm:bg-[length:150px_auto] bg-no-repeat bg-right lg:bg-[250px] relative group h-full overflow-clip'>
            <FeaturedDetails title={"Speakers"} paragraph={"Amazon wireless speaker"}/>
          </div>
          <div className='bg-slate-100 bg-[url("/assets/frame706.png")] bg-[length:100px_auto] sm:bg-[length:150px_auto] bg-no-repeat bg-right lg:bg-[250px] relative group h-full overflow-clip'>
            <FeaturedDetails title={"Perfume"} paragraph={"Gucci intense oud edp"}/>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FeaturedProducts;
