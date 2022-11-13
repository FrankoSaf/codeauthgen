import React from "react";
import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Registration from "../../../components/UI/UserRegistration/MainContainer";
import TitleContainer from "../../../components/UI/UserRegistration/TitleContainer";
import FormContainer from "../../../components/UI/UserRegistration/FormContainer";
import ButtonContainer from "../../../components/UI/UserRegistration/ButtonContainer";
import usePasswordToggle from "./usePasswordToggle";
import AuthContainer from "../../../components/UI/UserRegistration/AuthContainer";
import PassportContainer from "../../../components/UI/UserRegistration/PassportContainer";
import { baseUrl } from "../../../assets/api/api";

export default function Register() {
  const navigate = useNavigate();

  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const [userInput, setUserInput] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [passwordConfirmError, SetPasswordConfirmError] = useState();
  const [firstNameError, setFirstNameError] = useState();
  const [lastNameError, setLastNameError] = useState();

  const onChangeHandler = (e) => {
    const inputValue = e.target.value;
    setUserInput((prev) => {
      return {
        ...prev,
        [e.target.name]: inputValue.trim(),
      };
    });
  };

  const registerHandler = (e) => {
    e.preventDefault();
    console.log(userInput);
    axios
      .post(`${baseUrl}/authentication/register`, userInput)
      .then((result) => {
        sessionStorage.setItem(
          "loggedInUser",
          JSON.stringify({ currentUser: result.data })
        );
        navigate("/login");
      })
      .catch((error) => {
        // show error message to user
        error.response.data.forEach((error) => {
          if (error.param === "email") setEmailError(error.msg);
          if (error.param === "password") setPasswordError(error.msg);
          if (error.param === "passwordConfirmation")
            SetPasswordConfirmError(error.msg);
          if (error.param === "firstName") setFirstNameError(error.msg);
          if (error.param === "lastName") setLastNameError(error.msg);
        });

        console.log(error.response.data);
      });
    setEmailError("");
    setPasswordError("");
    SetPasswordConfirmError("");
    setFirstNameError("");
    setLastNameError("");
  };

  return (
    <Registration>
      <TitleContainer>
        <h2>Get started for free</h2>
        <p>Enter your details to create new account.</p>
      </TitleContainer>
      <AuthContainer>
        <PassportContainer />
        <Divider>
          <div>
            <p>or</p>
          </div>
        </Divider>
        <StyledFormContainer>
          <InputDiv>
            <StyledTextField
              className="text-field"
              size="small"
              name="email"
              id="filled-basic"
              label="Email"
              variant="filled"
              onChange={onChangeHandler}
            />
            {emailError && <p>{emailError}</p>}
          </InputDiv>
          <InputDiv>
            <div style={{ position: "relative" }}>
              <StyledTextField
                className="text-field"
                name="password"
                id="filled-basic"
                label="Password"
                variant="filled"
                type={PasswordInputType}
                autoComplete="current-password"
                onChange={onChangeHandler}
              />
              <IconSpan className="password-toggle-icon">{ToggleIcon}</IconSpan>
            </div>
            {passwordError && <p>{passwordError}</p>}
          </InputDiv>
          <InputDiv>
            <StyledTextField
              className="text-field"
              size="small"
              name="passwordConfirmation"
              id="filled-basic"
              label="Confirm Password"
              variant="filled"
              type={PasswordInputType}
              autoComplete="current-password"
              onChange={onChangeHandler}
            />
            {passwordConfirmError && <p>{passwordConfirmError}</p>}
          </InputDiv>
          <InputDiv>
            <StyledTextField
              className="text-field"
              size="small"
              id="filled-basic"
              label="First Name"
              variant="filled"
              type="text"
              name="firstName"
              onChange={onChangeHandler}
            />
            {firstNameError && <p>{firstNameError}</p>}
          </InputDiv>
          <InputDiv>
            <StyledTextField
              className="text-field"
              id="filled-basic"
              label="Last Name"
              variant="filled"
              type="text"
              name="lastName"
              onChange={onChangeHandler}
            />
            {lastNameError && <p>{lastNameError}</p>}
          </InputDiv>
          <ButtonContainer>
            <button onClick={registerHandler} value="Register">
              Register
            </button>
            {/* <GoogleLoginCom /> */}
          </ButtonContainer>
          <p style={{ color: "black", marginTop: "1rem" }}>
            Already have an account? Login <NavLink to="/login">here!</NavLink>
          </p>
        </StyledFormContainer>
      </AuthContainer>
    </Registration>
  );
}

// STYLED COMPONENTS

const StyledTextField = styled(TextField)`
  width: 100%;
  height: 70% !important;
`;

const IconSpan = styled.span`
  position: absolute;
  right: 10px;
  bottom: 50%;
  transform: translateY(50%);
`;

const StyledFormContainer = styled(FormContainer)`
  width: 50%;
  margin: 0;
`;

const InputDiv = styled.div`
  margin-bottom: 1rem;
  p {
    color: tomato;
    margin-top: 0.2rem;
  }
`;

const Divider = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
