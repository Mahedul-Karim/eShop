import React, { useState } from "react";
import Container from "../../util/Container";

import WishListItems from "./WishListItems";
import { useSelector } from "react-redux";
import TableGrid from "../ui/table/Grid";
import Empty from "../ui/table/Empty";


const Wishlist = () => {
  const { wishlist } = useSelector((state) => state.wishlist);

  return (
    <Container styles={"my-8"}>
      {wishlist.length !== 0 ? (
        <div className="min-h-[50vh]">
          <TableGrid
            extraClass={"border-b border-solid text-[#999] py-3 md:grid hidden"}
          >
            <div>Product</div>
            <div>Price</div>
            <div>Stock Status</div>
            <div></div>
            <div></div>
          </TableGrid>
          {wishlist.map((i, index) => (
            <WishListItems key={index} data={i} />
          ))}
        </div>
      ) : (
        <Empty text={"You have not added any product to wishlist!!"} />
      )}
    </Container>
  );
};

export default Wishlist;
