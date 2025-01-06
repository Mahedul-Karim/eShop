import React from "react";
import Container from "../../util/Container";

function NewsLetter() {
  return (
    <Container
      styles={
        "bg-[url('/assets/bg.jpg')] bg-cover bg-no-repeat py-12 sm:py-16 rounded-md sm:px-20 px-8"
      }
    >
      <h2 className="text-xl 400px:text-2xl sm:text-4xl text-[#292930] font-[600] mb-6 sm:mb-10">
        Get weekly update
      </h2>

      <div className="flex items-center flex-col sm:flex-row gap-4">
        <div className="bg-white flex items-center py-2 400px:py-4 max-w-[360px] w-full rounded-lg">
          <input
            type="text"
            placeholder="Enter your email"
            className="bg-transparent px-4 text-sm w-full h-full"
          />
          
        </div>
        <button className="bg-secondary py-2 400px:py-3.5 px-6 w-full sm:w-max 400px:text-base text-sm text-white rounded-lg">
          Subscribe
        </button>
        
      </div>
    </Container>
  );
}

export default NewsLetter;
