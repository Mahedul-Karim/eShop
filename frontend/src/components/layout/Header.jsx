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
      <div className="hidden 800px:block border-b-[1px] border-solid border-border pb-2 bg-white">
        <Container>
          <div className="flex flex-row-reverse py-3">
            <SellerLink />
          </div>
        </Container>
      </div>
    <div className="hidden 800px:flex items-center justify-between h-[70px] bg-white shadow-sm">

      <Container
        styles={`h-full`}
        >
        <Nav />
      </Container>
        </div>

      <MobileNav open={open} setOpen={setOpen} styles={styles} />
    </>
  );
}
export default Header;
