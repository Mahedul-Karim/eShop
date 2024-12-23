import React from "react";
import Container from "../../util/Container";

function NewsLetter() {
  return (
    <div className="bg-[url('/assets/bg-2.jpg')] bg-cover bg-no-repeat py-4 sm:p-4">
      <div className="bg-white px-2 py-6">
        <Container styles={"flex flex-col items-center justify-center"}>
          <h2 className="text-2xl font-[600]">Get the Latest Deals</h2>
          <span className="text-dot">and</span>
          <p className="text-dot">
            receive <span className="text-secondary">$20 coupon</span> for first
            shopping
          </p>
          <div className="flex items-center border-[1px] border-solid border-grey-200 rounded-2xl overflow-hidden mt-4 focus:border-secondary">
            <input
              type="text"
              placeholder="Enter your email"
              className="p-2 w-[150px] 400px:w-full"
            />
            <button className="bg-secondary block p-2 w-[60px] text-lg text-white">
              &rarr;
            </button>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default NewsLetter;
