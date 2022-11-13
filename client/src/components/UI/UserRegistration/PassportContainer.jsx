import React from "react";
import styled from "styled-components";
import GoogleLogo from "../GoogleLogo";
import {BsGithub} from 'react-icons/bs'
// import {baseUrl} from '../../../assets/api/api'
import config from '../../../config'


export default function PassportContainer() {
  return (
    <Passport>
        <Anchor href={`${config[config.model].domain}/authentication/google`}><GoogleLogo/>Google</Anchor>
        <Anchor href={`${config[config.model].domain}/authentication/github`}><BsGithub className='github logo'/>GitHub</Anchor>
    </Passport>
  );
}

const Passport = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  a {
    text-decoration: none;
    color: black;
  }
`;

const Anchor = styled.a`
border: 1px solid gray;
margin-bottom: 0.5rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  .github {
    font-size: 1.5rem;
}
.logo {
      margin-right: 0.5rem;
  }
`;
