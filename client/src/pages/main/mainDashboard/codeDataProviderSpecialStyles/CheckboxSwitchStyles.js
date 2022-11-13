import styled from "styled-components";
export const InputWrapper = styled.label`
  position: relative;
`;

export const Input = styled.input`
  position: absolute;
  left: -9999px;
  top: -9999px;
  display: none;
  &:checked + span {
    background-color: #0ba47e;
    &:before {
      left: 27px;
    }
  }
  &:focus + span {
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
  &:focus:checked + span {
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

export const Slider = styled.span`
  display: flex;
  cursor: pointer;
  width: 50px;
  height: 25px;
  border-radius: 100px;
  background-color: gray;
  position: relative;
  transition: background-color 0.2s, box-shadow 0.2s;

  &:before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 21px;
    height: 21px;
    border-radius: 21px;
    transition: 0.2s;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 35, 11, 0.2);
  }
`;
