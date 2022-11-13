import "../codeDataProviderSpecialStyles/InputsFormSpecialStyles.css";
import { useContext } from "react";
import { Context } from "../../../../store/Context";
import styled from "styled-components";
import { initializingServerData } from "../../../../assets/data/backendFormData.js";
export default function ServerInitForm() {
  const {
    serverInitOnChange,
    setServerInitOnChange,
    setArrOfServerInit,
    darkTheme,
  } = useContext(Context);

  const onServerInitInputsChangeHandler = (e) => {
    setServerInitOnChange((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    setArrOfServerInit(serverInitOnChange);
  };
  return (
    <Form className="editor-on">
      <InnerFormWrapper>
        {initializingServerData.map((el, i) => {
          if (el.name === "PORT") {
            return (
              <LabelInputWrapper
                className={darkTheme ? "dark-theme" : "light-theme"}
                id={
                  darkTheme
                    ? el.nameForTemplate + "Dark"
                    : el.nameForTemplate + "Light"
                }
              >
                <input
                  type="number"
                  name={el.nameForTemplate}
                  onChange={onServerInitInputsChangeHandler}
                  placeholder={el.placeholder}
                />
              </LabelInputWrapper>
            );
          }
          return (
            <LabelInputWrapper
              className={darkTheme ? "dark-theme" : "light-theme"}
              id={
                darkTheme
                  ? el.nameForTemplate + "Dark"
                  : el.nameForTemplate + "Light"
              }
            >
              <input
                type="text"
                name={el.nameForTemplate}
                onChange={onServerInitInputsChangeHandler}
                placeholder={el.placeholder}
              />
            </LabelInputWrapper>
          );
        })}
      </InnerFormWrapper>
    </Form>
  );
}
// STYLED COMPONENTS

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InnerFormWrapper = styled.div`
  margin: 1rem auto;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LabelInputWrapper = styled.div`
  width: 90%;
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  input,
  select {
    width: 100%;
    border: none;
    background: none;
    border-radius: 0.2rem;
    padding: 0.4rem;
    font-size: 1rem;
    &::placeholder {
      font-size: 12px;
    }
  }
  &.light-theme {
    label {
      color: var(--backgroundColor);
    }
    input,
    select {
      border: solid 1px var(--backgroundColor);
      color: var(--backgroundColor);
    }
  }
  &.dark-theme {
    label {
      color: var(--lightBackgroundColor);
    }
    input,
    select {
      border: solid 1px var(--lightBackgroundColor);
      color: var(--lightBackgroundColor);
    }
  }

  input[type="text"]:focus {
    background: none;
    border: #0ba47e 1px solid;
    outline: none;
  }
`;
