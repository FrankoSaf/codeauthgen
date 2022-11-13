import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Context } from "../../store/Context";
import ProfileCodeCards from "./ProfileCodeCards";
import MainButton from "../../components/UI/MainButton";
import { BsUpload } from "react-icons/bs";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { baseUrl } from "../../assets/api/api";
export default function ProfileSidebar() {
  const { user, setUser, darkTheme } = useContext(Context);
  const [openFormUserUpdate, setOpenFormUserUpdate] = useState(false);
  // const [formInputs, setFormInputs] = useState({});
  const [currentUser, setCurrentUser] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    id: user._id,
  });
  const [submitButton, setSubmitButton] = useState(false);
  const [avatar, setAvatar] = useState(
    "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
  );
  const [image, setImage] = useState();
  const [errorFirst, setErrorFirst] = useState("");
  const [errorLast, setErrorLast] = useState("");
  const [errorOld, setErrorOld] = useState("");
  const [errorNew, setErrorNew] = useState("");
  const [errorNewConf, setErrorNewConf] = useState("");
  const [message, setMessage] = useState("");

  const onChangeHandler = (e) => {
    const newUserInfo = e.target.value;
    setCurrentUser((pre) => {
      return { ...pre, [e.target.name]: newUserInfo };
    });
  };
  useEffect(() => {
    if (user?.avatar?.trim().length > 0) setAvatar(user.avatar);
  }, [user]);
  const submitHandler = async (e) => {
    e.preventDefault();

    setErrorFirst("");
    setErrorLast("");
    setErrorOld("");
    setErrorNew("");
    setErrorNewConf("");
    try {
      const data = await axios.put(
        `${baseUrl}/user/update/${user._id}`,
        currentUser
      );
      console.log(data.data);
      setUser(data.data.newUser);
      setMessage(data.data.msg);
    } catch (err) {
      err.response.data.forEach((item) => {
        console.log(item);
        if (item.param === "firstName") setErrorFirst(item.msg);
        if (item.param === "lastName") setErrorLast(item.msg);
        if (item.param === "oldPassword") setErrorOld(item.msg);
        if (item.param === "newPassword") setErrorNew(item.msg);
        if (item.param === "newPasswordConfirm") setErrorNewConf(item.msg);
      });
      console.log(err.response.data);
    }
  };

  const fileOnChange = async (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
    setSubmitButton(true);
  };
  const uploadImage = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("photo", image);
      const data = await axios.post(`${baseUrl}/user/profilephoto`, formData);
      user.avatar = data.data.url;
      setAvatar(data.data.url);
      setSubmitButton(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ProfileContainer className={darkTheme ? "dark-theme" : "light-theme"}>
      <div style={{ position: "relative" }}>
        <img
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            objectFit: "cover",
            objectPosition: "center",
          }}
          onChange={fileOnChange}
          src={avatar}
          alt="User profile"
        />
        <LabelPhoto htmlFor="photo">
          <BsUpload />
        </LabelPhoto>
      </div>
      <form onSubmit={uploadImage}>
        <div>
          <input
            type="file"
            name="photo"
            id="photo"
            style={{ display: "none" }}
            onChange={fileOnChange}
            accept="image/png, image/jpeg"
          />
        </div>
        {submitButton && <ProfilePicSubmitBTN type="submit" value="Submit" />}
      </form>
      <h1>
        {user.firstName} {user.lastName}
      </h1>
      <MainButton
        type="button"
        onClick={() => {
          setOpenFormUserUpdate(!openFormUserUpdate);
        }}
      >
        {" "}
        {!openFormUserUpdate ? "Update Account Settings" : "Close"}
      </MainButton>
      {openFormUserUpdate && (
        <Form onSubmit={submitHandler}>
          <StyledTextField
            size="small"
            id="filled-basic"
            label="First Name"
            variant="filled"
            type="text"
            name="firstName"
            value={currentUser.firstName}
            onChange={onChangeHandler}
          />

          {errorFirst.length > 0 && <Error>{errorFirst}</Error>}

          <StyledTextField
            size="small"
            required
            id="outlined-required"
            label="Last Name"
            variant="filled"
            value={currentUser.lastName}
            type="text"
            name="lastName"
            onChange={onChangeHandler}
          />

          {errorLast.length > 0 && <Error>{errorLast}</Error>}
          <AccordionProfile style={{ marginTop: "0" }}>
            <AccordionSummaryProfile
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              Change Password
            </AccordionSummaryProfile>
            <AccordionDetails>
              <StyledTextField
                size="small"
                id="filled-basic"
                label="Enter old password"
                variant="filled"
                type="password"
                name="oldPassword"
                onChange={onChangeHandler}
              />

              {errorOld.length > 0 && <Error>{errorOld}</Error>}

              <StyledTextField
                size="small"
                id="filled-basic"
                label="New password"
                variant="filled"
                type="password"
                name="newPassword"
                onChange={onChangeHandler}
              />

              {errorNew.length > 0 && <Error>{errorNew}</Error>}

              <StyledTextField
                size="small"
                id="filled-basic"
                label="Confirm new password"
                variant="filled"
                type="password"
                name="newPasswordConfirm"
                onChange={onChangeHandler}
              />

              {errorNewConf.length > 0 && <Error>{errorNewConf}</Error>}
            </AccordionDetails>
          </AccordionProfile>

          <MainButton type="submit">submit</MainButton>
          {message && <h2>{message}</h2>}
        </Form>
      )}
      {!openFormUserUpdate ? <ProfileCodeCards /> : null}
    </ProfileContainer>
  );
}

// STYLED COMPONENTS

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Form = styled.form`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  margin-top: 1rem;
  padding: 2rem 0;
  margin-bottom: 2rem;
  h2 {
    color: black;
    font-size: 1rem;
    text-align: center;
    margin-top: 1rem;
  }
`;
const StyledTextField = styled(TextField)`
  &:first-of-type input {
    border-radius: 5px 5px 0 0;
  }
  width: 100%;
  input {
    background-color: white;
    font-size: 20px;
  }
`;
const AccordionProfile = styled(Accordion)`
  width: 100%;
  div {
    padding: 0;
  }
  input {
    width: 100%;
    padding: auto 0;
  }
`;
const AccordionSummaryProfile = styled(AccordionSummary)`
  div {
    padding: 0 10px;
  }
`;
const Error = styled.p`
  color: tomato;
  font-size: 14px;
  margin: 1rem 0;
  text-align: center;
`;

const LabelPhoto = styled.label`
  position: absolute;
  top: 0;
  font-size: 20px;
`;

const ProfilePicSubmitBTN = styled.input`
  background-color: var(--warningColor);
  width: fit-content;
  padding: 0.1rem 1rem;
  margin-top: 1.3rem;
  border-radius: 0.2rem;
  font-weight: 200;
  font-size: 1rem;
  border: 3px solid transparent;
  transition: ease-out 0.1s all;
  color: white;
  cursor: pointer;
  margin-bottom: 0.3rem;
  :active {
    transform: translate(0.1rem, 0.1rem);
  }
  :hover {
    background-color: transparent;
    border: 3px solid var(--warningColor);
    color: var(--warningColor);
  }
`;
