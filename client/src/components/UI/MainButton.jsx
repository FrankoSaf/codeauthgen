import React from "react";
import styled from "styled-components";
export default function MainButton({ children, onClick, type }) {
  return <Button onClick={onClick}>{children}</Button>;
}

const Button = styled.button`
  background-color: var(--warningColor);
  width: fit-content;
  padding: 0.5rem 1rem;
  margin-top: 1.3rem;
  border-radius: 0.2rem;
  font-weight: 200;
  font-size: 1.2rem;
  border: 3px solid transparent;
  transition: ease-out 0.1s all;
  color: white;
  cursor: pointer;
  :active {
    transform: translate(0.1rem, 0.1rem);
  }
  :hover {
    background-color: transparent;
    border: 3px solid var(--warningColor);
    color: var(--warningColor);
  }
`;
