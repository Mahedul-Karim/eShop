import React from "react";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../util/data";
import Container from "../../util/Container";
import Heading from "../ui/Heading";

const Category = () => {
  const navigate = useNavigate();
  return (
    <Container styles={"my-4 py-4"}>
      <Heading>Popular categories</Heading>

      <div className="grid mt-[20px] grid-cols-2 sm:grid-cols-3 gap-3 1000px:grid-cols-6">
        {categoriesData.slice(1,7).map((cat) => (
          <div
            className="flex flex-col justify-end items-center gap-8 text-[14px] font-[400] text-dot group cursor-pointer"
            key={cat.id}
          >
            <div>
              <img
                src={cat.image_Url}
                alt="category"
                className="block group-hover:-translate-y-[20px] transition-all"
              />
            </div>
            <p>{cat.title}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Category;
