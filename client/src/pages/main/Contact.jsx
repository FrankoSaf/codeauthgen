import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContainer from "../../components/UI/UserRegistration/AuthContainer";
import FormContainer from "../../components/UI/UserRegistration/FormContainer";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import ButtonContainer from "../../components/UI/UserRegistration/ButtonContainer";
import { Context } from "../../store/Context";
import {baseUrl} from '../../assets/api/api'

export default function Contact() {
  const [input, setInput] = useState();
  const [message, setMessage] = useState();
  const { darkTheme } = useContext(Context);

  const onChangeHandler = (e) => {
    const inputValue = e.target.value;
    setInput((prev) => {
      return {
        ...prev,
        [e.target.name]: inputValue,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if(e.target.name.value && e.target.subject.value && e.target.email.value && e.target.message.value) {
      axios
        .post(baseUrl + "/other/contact", input)
        .then((result) => {
          console.log(result);
          if (result.data.mailSent) {
            setMessage(
              "Thank you for sending your message. We will contact you soon"
            );
          } else {
            setMessage("Please try again");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else setMessage("Please fill out the form")
  };

  return (
    <Container>
      {message && (
        <h2 className={darkTheme ? "dark-theme" : "light-theme"}>{message}</h2>
      )}
      <AuthContainer>
        <FormContainer>
          <h1>Contact us</h1>
          <div>
            <StyledTextField
              required={true}
              className="text-field"
              name="name"
              id="filled-basic"
              label="Name"
              variant="filled"
              onChange={onChangeHandler}
            />
            <StyledTextField
              required
              className="text-field"
              name="subject"
              id="filled-basic"
              label="Subject"
              variant="filled"
              onChange={onChangeHandler}
            />
            <StyledTextField
              required
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
              required
              className="text-field"
              name="message"
              id="filled-basic"
              label="Send us a message"
              variant="filled"
              onChange={onChangeHandler}
            />
          </div>

          <ButtonContainer>
            <button onClick={submitHandler} value="Send Message">
              Send message
            </button>
          </ButtonContainer>
        </FormContainer>
      </AuthContainer>
    </Container>
  );
}

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const Container = styled.div`
  padding: 2rem;
  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
