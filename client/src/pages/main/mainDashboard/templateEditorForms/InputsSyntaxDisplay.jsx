import "../codeDataProviderSpecialStyles/InputsFormSpecialStyles.css";
import { useContext } from "react";
import { Context } from "../../../../store/Context";
import { RiDeleteBin5Fill, RiAddBoxLine } from "react-icons/ri";
import styled from "styled-components";

export default function InputsSyntaxDisplay() {
  const {
    arrOfInputs,
    setArrOfInputs,
    selectedRadio,
    setSelectedRadio,
    arrOfLoginInputs,
    setArrOfLoginInputs,
    inputError,
    setInputError,
    setBackendEditorOpen,
    darkTheme,
  } = useContext(Context);

  // DELETE CREATED INPUTS
  const deleteInputHandler = (inputIndex) => {
    let newArrOfInputs = arrOfInputs.filter((input, i) => i !== inputIndex);
    setArrOfInputs(newArrOfInputs);
  };

  // DELETE LOGIN INPUTS
  const deleteLoginInputHandler = (inputIndex) => {
    let newArrOfInputs = arrOfLoginInputs.filter(
      (input, i) => i !== inputIndex
    );
    setArrOfLoginInputs(newArrOfInputs);
  };

  // ADD INPUT TO LOGIN INPUTS ARRAY
  const addInputToArrOfLoginInputsHandler = (index) => {
    let wantedInput = arrOfInputs.find((el, i) => i === index);
    setArrOfLoginInputs((prev) => {
      if (!arrOfLoginInputs.some((el) => el.name === wantedInput.name)) {
        setBackendEditorOpen(true);
        setInputError("");
        return [...prev, wantedInput];
      } else {
        setInputError("not possible to add duplicated input");
        return prev;
      }
    });
  };
  return (
    <>
      {arrOfInputs.length > 0 && (
        <UlWrapperDiv
          className={
            darkTheme ? "editor-on dark-theme" : "editor-on light-theme"
          }
        >
          <UL className={darkTheme ? " dark-theme" : " light-theme"}>
            {inputError && <span>{inputError}</span>}
            {arrOfInputs.map((element, index) => {
              if (index === 0) {
                return (
                  <LI
                    key={index}
                    className={darkTheme ? " dark-theme" : " light-theme"}
                  >
                    <span>{`<input type="${element.type}" name="${
                      element.name
                    }" ${element.required ? `required` : ""} />`}</span>
                    <ButtonsWrapper
                      className={darkTheme ? " dark-theme" : " light-theme"}
                    >
                      <LoginMethod
                        className={darkTheme ? " dark-theme" : " light-theme"}
                        onClick={() => {
                          const name = element.name;
                          return setSelectedRadio(name);
                        }}
                      >
                        <p>login method? </p>
                        <input
                          type="radio"
                          name="main"
                          default
                          value={element.name}
                          checked={selectedRadio === element.name}
                        />
                      </LoginMethod>

                      <div onClick={() => deleteInputHandler(index)}>
                        <p>Delete</p>
                        <RiDeleteBin5Fill
                          style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            verticalAlign: "middle",
                          }}
                        />
                      </div>
                      <div
                        onClick={() => addInputToArrOfLoginInputsHandler(index)}
                      >
                        <p>Login</p>
                        <RiAddBoxLine
                          style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            verticalAlign: "middle",
                          }}
                        />
                      </div>
                    </ButtonsWrapper>
                  </LI>
                );
              }
              return (
                <LI
                  key={index}
                  className={darkTheme ? " dark-theme" : " light-theme"}
                >
                  <span>{`<input type="${element.type}" name="${
                    element.name
                  }" ${element.required ? `required` : ""} />`}</span>
                  <ButtonsWrapper
                    className={darkTheme ? " dark-theme" : " light-theme"}
                  >
                    <LoginMethod
                      className={darkTheme ? " dark-theme" : " light-theme"}
                      onClick={() => {
                        const name = element.name;
                        setSelectedRadio(name);
                      }}
                    >
                      <p>login method? </p>
                      <input
                        type="radio"
                        name="main"
                        value={element.name}
                        checked={selectedRadio === element.name}
                      />
                    </LoginMethod>

                    <div onClick={() => deleteInputHandler(index)}>
                      <p>Delete</p>
                      <RiDeleteBin5Fill
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          verticalAlign: "middle",
                        }}
                      />
                    </div>
                    <div
                      onClick={() => addInputToArrOfLoginInputsHandler(index)}
                    >
                      <p>Login</p>{" "}
                      <RiAddBoxLine
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          verticalAlign: "middle",
                        }}
                      />
                    </div>
                  </ButtonsWrapper>
                </LI>
              );
            })}
          </UL>
        </UlWrapperDiv>
      )}
      <UlWrapperDiv
        className={darkTheme ? "editor-on dark-theme" : "editor-on light-theme"}
      >
        <h3>LOGIN INPUTS</h3>
        <UL className={darkTheme ? " dark-theme" : "light-theme"}>
          {" "}
          {arrOfLoginInputs.map((el, i) => {
            return (
              <LI key={i} className={darkTheme ? " dark-theme" : "light-theme"}>
                <span>{`<input type="${el.type}" name="" ${
                  el.required ? `required` : ""
                } />`}</span>
                <ButtonsWrapper
                  className={darkTheme ? " dark-theme" : "light-theme"}
                >
                  <div onClick={() => deleteLoginInputHandler(i)}>
                    <p>Delete</p>
                    <RiDeleteBin5Fill
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        verticalAlign: "middle",
                      }}
                    />
                  </div>
                </ButtonsWrapper>
              </LI>
            );
          })}
        </UL>
      </UlWrapperDiv>
    </>
  );
}

// STYLED COMPONENTS

const UlWrapperDiv = styled.div`
  margin-top: 1rem;
  margin-right: 1rem;
  h3 {
    font-size: 1rem;
    margin-left: 1rem;
  }
  &.light-theme {
    h3 {
      color: var(--backgroundColor);
    }
  }
  &.dark-theme {
    h3 {
      color: var(--lightBackgroundColor);
    }
  }
`;

const UL = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;

  justify-content: center;
  width: 100%;
`;

const LI = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 1rem ;
  width: 90%;
  height: auto;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  transition: ease-in 0.1s all;
  letter-spacing: 2px;
  list-style: none;
  cursor: pointer;
  background-color: transparent;
  border-radius: 0.2rem;
  span {
    width: 100%;
    padding: 0.2rem;
    transition: ease-in 0.2s all;
    padding: 0.2rem 1rem;
    font-family: "IBM Plex Mono", monospace;
    font-size: 1.1rem;
    font-weight: 400;
    letter-spacing: 2px;
    &:active {
      background-color: var(--warningColor);
    }
  }
  &.light-theme {
    border: solid 1px black;
    span {
      color: var(--backgroundColor);
      /* border-radius: 0.5rem; */
      /* border-top: solid 1px var(--backgroundColor);
      border-left: solid 1px var(--backgroundColor);
      border-right: solid 1px var(--backgroundColor); */
      &:active {
        background-color: white;
      }
    }
  }
  &.dark-theme {
    border: solid 1px white;
    span {
      color: var(--greenCodeColor);
      /* border-top: solid 1px white;
      border-left: solid 1px white;
      border-right: solid 1px white; */
      &:hover {
        background-color: #098d6c;
        color: white;
      }
      &:active {
        background-color: white;
      }
    }
  }
`;

const ButtonsWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    background-color: var(--warningColorLighterHover);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 33%;
    height: 2rem;
    cursor: pointer;
    font-size: 0.8rem;
    transition: ease 0.2s all;
    letter-spacing: 2px;
    vertical-align: top;

    &:hover {
      background-color: var(--warningColor);
      color: white;
    }
    &:active {
      background-color: var(--warningColorLighterHover);
    }
    p {
      margin-right: 0.4rem;
    }
  }
  &.light-theme {
    div {
      /* border: solid var(--backgroundColor) 1px; */
      color: var(--backgroundColor);
      &:hover {
        color: white;
      }
    }
  }
  &.dark-theme {
    div {
      /* border: solid var(--lightBackgroundColor) 1px; */
      color: white;
    }
  }
`;

const LoginMethod = styled.div`
  padding: 1rem;
  font-size: 0.8rem;

  div {
    display: flex;
    justify-content: space-between;
  }
`;
