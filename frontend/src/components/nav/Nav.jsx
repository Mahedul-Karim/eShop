import NavItems from "./NavItems";
import NavIcons from "./NavIcons";
import Logo from "../ui/Logo";

function Nav({setOpen}) {
  return (
    <div
      className={`flex-col 800px:flex-row w-full relative flex items-center justify-between 800px:h-full`}
    >
      <Logo classes={"hidden 800px:block"}/>
      <div className={`flex items-center h-full w-full 800px:w-auto px-4 800px:px-0`}>
        <NavItems  setOpen={setOpen}/>
      </div>

      <NavIcons />
    </div>
  );
}
export default Nav;
