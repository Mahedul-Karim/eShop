import { useEffect, useState } from "react";
import styles from "../../util/style";
import Nav from "../nav/Nav";
import MobileNav from "../nav/MobileNav";
import Container from "../../util/Container";

import SellerLink from "../ui/SellerLink";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Container
        styles={
          "hidden 800px:block border-b-[1px] border-solid border-grey-200 pb-2"
        }
      >
        <div className="flex flex-row-reverse py-3">
          <SellerLink />
        </div>
      </Container>

      <Container
        styles={` hidden 800px:flex items-center justify-between w-full h-[70px] bg-white shadow-sm`}
      >
        <Nav />
      </Container>

      <MobileNav open={open} setOpen={setOpen} styles={styles} />
    </>
  );
}
export default Header;
