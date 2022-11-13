import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../../assets/api/api';
import AuthContainer from '../../../components/UI/UserRegistration/AuthContainer';
import FormContainer from '../../../components/UI/UserRegistration/FormContainer';
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import ButtonContainer from '../../../components/UI/UserRegistration/ButtonContainer';
import { Context } from '../../../store/Context';


const PasswordChange = () => {
  const [email, setEmail] = useState({});
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const {darkTheme} = useContext(Context);



  const onChangeHandler = (e) => {
    const emailValue = e.target.value;
    setEmail((pre) => {
      return { ...pre, [e.target.name]: emailValue };
    });
  };


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(`${baseUrl}/user/emailreset`, email);
      console.log(data);
      setMessage('Email sent')
    } catch (err) {
      setMessage(err.response.data)
      console.log(err.response.data)
      // navigate('/login');
    }
  };


  return (
    <Container>
      {message && <h2 className={darkTheme ? "dark-theme" : "light-theme"}>{message}</h2>}
    <AuthContainer>
      <FormContainer>
      <div>
            <StyledTextField
              required={true}
              className="text-field"
              name="email"
              id="filled-basic"
              label="Email"
              variant="filled"
              onChange={onChangeHandler}
            />
          </div>
          <ButtonContainer>
            <button onClick={onSubmitHandler} value="Send Message">
              Send
            </button>
          </ButtonContainer>
      </FormContainer>
    </AuthContainer>
    </Container>
    // <div>
    //   <form onSubmit={onSubmitHandler}>
    //     <label htmlFor='email'>Enter an email for further instructions</label>
    //     <input
    //       type='email'
    //       required
    //       name='email'
    //       placeholder='Your Email'
    //       id='email'
    //       onChange={onChangeHandler}
    //     />
    //     <input
    //       type='submit'
    //       value='Send
    //   '
    //     />
    //   </form>
    // </div>
  );
};

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

export default PasswordChange;
