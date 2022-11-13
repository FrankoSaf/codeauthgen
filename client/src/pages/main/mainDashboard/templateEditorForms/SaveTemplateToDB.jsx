import React, { useContext} from "react";
import styled from "styled-components";
import { Context } from "../../../../store/Context";

export default function SaveTemplateToDB() {
  const { setOpenModal} = useContext(Context);

  return <ButtonAddToDB onClick={()=>setOpenModal(true)}>SAVE</ButtonAddToDB>
}

// STYLED COMPONENTS

const ButtonAddToDB = styled.button`
  margin-top: 1rem;
  background-color: #fca311;
  width: 15rem;
  height: 2rem;
  margin-left: 1rem;
  border: 2px solid transparent;
  border-radius: 0.5rem;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  transition: ease-in 0.1s all;
  letter-spacing: 2px;
  &:hover {
    border: solid 2px #fca311;
    background: transparent;
    color: #fca311;
    cursor: pointer;
  }
`;



