import React from "react";
import styled from "styled-components";

export default function Registration({ children }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  height: 90vh;
  width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: relative;

  @media (max-width: 900px) {
    height: 100vh;
    width: 100%;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 100px;
  }
`;
