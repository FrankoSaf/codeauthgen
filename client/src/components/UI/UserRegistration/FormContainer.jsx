import styled from "styled-components";
import React from "react";

export default function FormContainer({ children }) {
  return <Container>{children}</Container>;
}

const Container = styled.form`
  margin-top: 1rem;
  @media (max-width: 908px) {
    width: 100%;
  }
  h3 {
    color: tomato;
    font-size: 1rem;
    text-align: center;
    margin-bottom: 0.3rem;
  }
  div {
    width: 100%;
    margin-bottom: 0.3rem;
    .text-field {
      width: 100%;
      height: 5rem;
    }
  }
  p {
    text-align: center;
  }
`;
