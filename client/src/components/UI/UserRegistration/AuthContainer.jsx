import React from "react";
import styled from "styled-components";

export default function AuthContainer({ children }) {
  return <Auth>{children}</Auth>;
}

const Auth = styled.div`
  width: 50%;
  background: white;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  padding: 1rem;
  @media (max-width: 900px) {
    width: 70%;
    margin-top: 100px;
  }
  @media (max-width: 500px) {
    width: 90%;
    margin-top: 100px;
  }
`;
