import Header from "../components/layout/Header";
import ProfileSidebar from "../components/user/ProfileSidebar";
import { useState } from "react";
import Container from "../util/Container";
import { Outlet } from "react-router-dom";
import Fallback from "../routes/Fallback";

function Profile() {
  const [active, setActive] = useState(0);
  return (
    <>
      <Container styles={`flex py-10`}>
        <div className="w-[80px] sm:w-[335px] border border-border rounded-md border-solid">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <div className="w-full">
          <Fallback>
            <Outlet />
          </Fallback>
        </div>
      </Container>
    </>
  );
}

export default Profile;
