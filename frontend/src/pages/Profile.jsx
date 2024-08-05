import Header from "../components/layout/Header";
import ProfileSidebar from "../components/user/ProfileSidebar";
import ProfileContent from "../components/user/ProfileContent";
import { useState } from "react";
import Container from "../util/Container";

function Profile() {
    const [active,setActive]=useState(1);
  return (
    <>
      <Header />
      <Container styles={`flex py-10`}>
        <div className="w-[80px] sm:w-[335px] border-r border-solid">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </Container>
    </>
  );
}

export default Profile;
