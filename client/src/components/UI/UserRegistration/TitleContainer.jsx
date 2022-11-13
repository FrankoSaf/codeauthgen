import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "../../../store/Context";
export default function TitleContainer({ children }) {
  const { darkTheme } = useContext(Context);
  return (
    <Container className={darkTheme ? "dark-theme" : "light-theme"}>
      {children}
    </Container>
  );
}

const Container = styled.div`
  &.light-theme {
    h2 {
      margin-bottom: 2rem;
      font-size: 4.5rem;
      font-weight: 100;
      color: var(--backgroundColor);
      span {
        color: var(--warningColor);
      }
    }
    @media (max-width: 900px) {
      h2 {
        font-size:3.5rem;
      }
    }
  }
  &.dark-theme {
    h2 {
      margin-bottom: 2rem;
      font-size: 4.5rem;
      font-weight: 100;
      color: var(--lightBackgroundColor);
      span {
        color: var(--warningColor);
      }
    }
    @media (max-width: 900px) {
      h2 {
        font-size:3.5rem;
      }
    }
  }
  margin: 1.5rem;
  p {
    font-size: 1.3rem;
  }

  @media (max-width: 900px) {
    text-align: center;
  }
`;
