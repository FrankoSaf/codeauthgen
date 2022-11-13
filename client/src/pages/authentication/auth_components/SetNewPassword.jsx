import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../../assets/api/api';
import AuthContainer from '../../../components/UI/UserRegistration/AuthContainer';
import FormContainer from '../../../components/UI/UserRegistration/FormContainer';
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import ButtonContainer from '../../../components/UI/UserRegistration/ButtonContainer';
import { Context } from '../../../store/Context';




const SetNewPassword = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState({});
  const [message, setMessage] = useState();
  const {darkTheme} = useContext(Context);



  useEffect(() => {
    (async () => {

      try {
        const data = await axios.get(`${baseUrl}/user/setNewPassword/${id}`);
        console.log(data);
      } catch (e) {
        navigate('/error');
      }
    })();
  }, []);
  const onChangeHandler = (e) => {
    const password = e.target.value;
    setNewPassword((pre) => {
      return { ...pre, [e.target.name]: password };
    });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put(`${baseUrl}/user/confirmNew/${id}`, newPassword);
      setMessage(data.data)
      setTimeout(()=> {
        navigate('/login')
      }, 2000)
    } catch (err) {
      setMessage(err.response.data)
      console.log(err);
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
              name="password"
              type='password'
              id="filled-basic"
              label="New password"
              variant="filled"
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <StyledTextField
              required={true}
              className="text-field"
              name="confirmPassword"
              type='password'
              id="filled-basic"
              label="Confirm password"
              variant="filled"
              onChange={onChangeHandler}
            />
          </div>
          <ButtonContainer>
            <button onClick={onSubmitHandler}>
              Submit
            </button>
          </ButtonContainer>
      </FormContainer>
    </AuthContainer>
    </Container>
    // <form onSubmit={onSubmitHandler}>
    //   <div>
    //     <label htmlFor='new'>New Password</label>
    //     <input
    //       type='password'
    //       name='password'
    //       id='new'
    //       onChange={onChangeHandler}
    //     />
    //   </div>
    //   <div>
    //     <label htmlFor='conf-new'>Confirm New Password</label>
    //     <input
    //       type='password'
    //       name='confirmPassword'
    //       id='conf-new'
    //       onChange={onChangeHandler}
    //     />
    //   </div>
    //   <input type='submit' />
    // </form>
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


export default SetNewPassword;
