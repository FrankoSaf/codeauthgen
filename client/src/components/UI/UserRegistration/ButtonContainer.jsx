import React from "react";
import styled from "styled-components";

export default function ButtonContainer({ children }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  div {
    width: 100%;
    a {
      color: white;
    }
  }

  button {
    display: flex;
    justify-content: center;
    width: 100%;
    color: white;
    background-color: var(--warningColor);
    padding: 0.5rem 1rem;
    border-radius: 0.2rem;
    font-weight: 200;
    font-size: 1.5rem;
    border: 3px solid transparent;
    transition: ease-out 0.1s all;
    cursor: pointer;
    :active {
      transform: translate(0.1rem, 0.1rem);
    }
    :hover {
      background-color: transparent;
      border: 3px solid var(--warningColor);
      color: var(--warningColor);
    }
  }
`;
