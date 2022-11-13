import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../store/Context";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import usePasswordToggle from "./usePasswordToggle";
import TextField from "@mui/material/TextField";
import Registration from "../../../components/UI/UserRegistration/MainContainer";
import TitleContainer from "../../../components/UI/UserRegistration/TitleContainer";
import FormContainer from "../../../components/UI/UserRegistration/FormContainer";
import ButtonContainer from "../../../components/UI/UserRegistration/ButtonContainer";
import PassportContainer from "../../../components/UI/UserRegistration/PassportContainer";
import AuthContainer from "../../../components/UI/UserRegistration/AuthContainer";
import { baseUrl } from "../../../assets/api/api";
console.log(baseUrl);
export default function LogIn() {
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();

  const [userInput, setUserInput] = useState();
  const { setUser, setIsLoggedIn, darkTheme } = useContext(Context);

  const navigate = useNavigate();

  const [error, setError] = useState();

  const onChangeHandler = (e) => {
    const inputValue = e.target.value;
    setUserInput((prev) => {
      return {
        ...prev,
        [e.target.name]: inputValue.trim(),
      };
    });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/authentication/login`, userInput)
      .then((result) => {
        if (result.data.verified) {
          sessionStorage.setItem(
            "loggedInUser",
            JSON.stringify({ currentUser: result.data })
          );
          setUser(result.data);
          setIsLoggedIn(true);
          navigate("/dashboard");
        } else {
          setError("Please verify your email first");
        }
      })
      .catch((err) => {
        setError(err.response.data);
        console.log(err.response);
      });
  };

  return (
    <Registration>
      <TitleContainer>
        <h2>
          Login to <span>L</span>azy <span>D</span>ev's
        </h2>
        <p>Enter your details to log in.</p>
      </TitleContainer>
      <AuthContainer>
        <PassportContainer />
        <Divider>
          <div>
            <p>or</p>
          </div>
        </Divider>
        <FormContainer>
          <div>
            <StyledTextField
              className="text-field"
              name="email"
              id="filled-basic"
              label="Email"
              variant="filled"
              onChange={onChangeHandler}
            />
          </div>

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
          {error && <h3>{error}</h3>}
          <ButtonContainer>
            <div>
              <button onClick={loginHandler} value="Login">
                Login
              </button>
            </div>
          </ButtonContainer>
          <p style={{ marginTop: "1rem" }}>
            <NavLink to="/passwordchange">Forgot your password?</NavLink>
          </p>
          <p style={{ color: "black", marginTop: "1rem" }}>
            Don't have an account yet? Sign up{" "}
            <NavLink to="/register">here!</NavLink>
          </p>
        </FormContainer>
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
  vertical-align: middle;
`;

const Divider = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
