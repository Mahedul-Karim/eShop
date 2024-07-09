
import styles from "../../util/style";

import NavItems from "./NavItems";
import NavIcons from "./NavIcons";
import Logo from "../ui/Logo";

function Nav() {
  return (
    <div
      className={`flex-col 800px:flex-row ${styles.section} relative ${styles.noramlFlex} justify-between 800px:h-full`}
    >
      <Logo />
      <div className={`${styles.noramlFlex} h-full`}>
        <NavItems  />
      </div>

      <NavIcons />
    </div>
  );
}
export default Nav;
