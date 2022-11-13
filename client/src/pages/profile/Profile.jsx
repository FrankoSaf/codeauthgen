import React, { useContext, useState, useEffect } from "react";
import ProfileSidebar from "./ProfileSidebar";
import styled from "styled-components";
import CodeTemplate from "../main/mainDashboard/CodeTemplate";
import { Context } from "../../store/Context";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Profile = () => {
  const { profileTemplates, darkTheme } = useContext(Context);
  const [spread, setSpread] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const spreadSidebar = () => {
    setSpread((pre) => !pre);
  };
  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setScreenWidth(newWidth);
      console.log("updating width");
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  return (
    <>
      <ProfilePage>
        {!spread && (
          <Sidebar className={darkTheme ? "dark-theme" : "light-theme"}>
            <ProfileSidebar />
            {profileTemplates?.backend && (
              <SpreadButton
                onClick={spreadSidebar}
                className={darkTheme ? "dark-theme" : "light-theme"}
              >
                {!spread ? <IoIosArrowForward /> : ""}
              </SpreadButton>
            )}
          </Sidebar>
        )}
        {spread || screenWidth > 768 ? (
          <TemplatesContainer
            style={!spread ? { display: "block", width: "100%" } : {}}
          >
            {spread ? (
              <SpreadButton
                style={{ left: "0", right: "100%" }}
                onClick={spreadSidebar}
                className={darkTheme ? "dark-theme" : "light-theme"}
              >
                <IoIosArrowBack />
              </SpreadButton>
            ) : (
              <></>
            )}

            {profileTemplates?.backend ? (
              <CodeTemplate id="codeTemplate" temp={profileTemplates} />
            ) : (
              <></>
            )}
          </TemplatesContainer>
        ) : (
          <></>
        )}
      </ProfilePage>
    </>
  );
};
export default Profile;

const ProfilePage = styled.section`
  display: flex;
  overflow-x: hidden;
  width: 100%;
  position: relative;
`;

const Sidebar = styled.div`
  align-self: flex-start;
  flex-basis: 20rem;
  width: 100%;
  transition: width 1s;
  position: relative;

  @media screen and (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;
const TemplatesContainer = styled.div`
  flex: 1;
  position: relative;
  transition: width 1s;
  @media screen and (max-width: 768px) {
    width: 0;
  }
`;

const SpreadButton = styled.button`
  position: fixed;
  top: 50%;
  right: 0;
  animation: pulse 1s infinite;
  border: none;
  font-size: 3rem;
  @keyframes pulse {
    from {
      transform: translateX(-10px);
    }
    to {
      transform: translateX(0);
    }
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  border: none;
  font-size: 3rem;
`;
