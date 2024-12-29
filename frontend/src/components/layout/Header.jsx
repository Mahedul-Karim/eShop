import { useEffect, useState } from "react";
import Nav from "../nav/Nav";
import MobileNav from "../nav/MobileNav";
import Container from "../../util/Container";


function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      
    <div className="hidden 800px:flex items-center justify-between h-[70px] bg-white shadow-sm">

      <Container
        styles={`h-full`}
        >
        <Nav />
      </Container>
        </div>

      <MobileNav open={open} setOpen={setOpen}  />
    </>
  );
}
export default Header;
