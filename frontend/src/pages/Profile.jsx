import styles from "../util/style";
import Header from "../components/layout/Header";
import ProfileSidebar from "../components/user/ProfileSidebar";
import ProfileContent from "../components/user/ProfileContent";
import { useState } from "react";

function Profile() {
    const [active,setActive]=useState(1);
  return (
    <div>
      <Header />
      <div className={`${styles.section} flex py-10`}>
        <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
    </div>
  );
}

export default Profile;
