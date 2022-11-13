import "../codeDataProviderSpecialStyles/InputsFormSpecialStyles.css";
import { useContext } from "react";
import { Context } from "../../../../store/Context.js";
import styled from "styled-components";
import CheckboxSwitchSelectAllBackendSettings from "../codeDataProviderSpecialStyles/CheckboxSwitchSelectAllBackendSettings";
import {
  backEndFormData,
  nodemailerSetting,
} from "../../../../assets/data/backendFormData.js";
import {
  Input,
  Slider,
  InputWrapper,
} from "../codeDataProviderSpecialStyles/CheckboxSwitchStyles";
import { MdLogin } from "react-icons/md";

export default function BackendForm() {
  const {
    setArrOfPackages,
    nodemailerSettingsOpen,
    setNodemailerSettingsOpen,
    nodemailerOnChange,
    setNodemailerOnChange,
    setArrOfNodemailer,
    arrOfNodemailer,
    darkTheme,
  } = useContext(Context);

  const onNodemailerInputChangeHandler = (e) => {
    setNodemailerOnChange((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    setArrOfNodemailer(nodemailerOnChange);
  };

  // FUNCTION TO TRACK THE CHANGE OF BACKEND PACKAGES CHECKBOXES
  const onPackageChangeHandler = (e) => {
    setArrOfPackages((prev) => [
      ...prev,
      { [e.target.name]: e.target.checked },
    ]);
  };
  console.log(arrOfNodemailer);
  return (
    <Form className="editor-on">
      <InnerFormWrapper>
        <SelectAllWrapper className={darkTheme ? "dark-theme" : "light-theme"}>
          {" "}
          <span style={{ fontWeight: "bold" }}>SELECT ALL: </span>
          <CheckboxSwitchSelectAllBackendSettings />
        </SelectAllWrapper>
        {backEndFormData.map((el, i) => {
          if (el === "nodemailer") {
            return (
              <EditorInputWrapper
                key={i}
                className={darkTheme ? "dark-theme" : "light-theme"}
              >
                <InputWrapper>
                  <span>WANT TO USE {el.toUpperCase()}</span>
                  <Input
                    type="checkbox"
                    name={el}
                    id=""
                    className={"checkBoxPackages"}
                    onChange={onPackageChangeHandler}
                    onClick={() =>
                      setNodemailerSettingsOpen(!nodemailerSettingsOpen)
                    }
                  />
                  <Slider />
                </InputWrapper>
              </EditorInputWrapper>
            );
          }
          return (
            <EditorInputWrapper
              key={i}
              className={darkTheme ? "dark-theme" : "light-theme"}
            >
              <InputWrapper>
                <span>WANT TO USE {el.toUpperCase()}</span>
                <Input
                  type="checkbox"
                  name={el}
                  id=""
                  className={"checkBoxPackages"}
                  onChange={onPackageChangeHandler}
                />
                <Slider />
              </InputWrapper>
            </EditorInputWrapper>
          );
        })}
        {nodemailerSettingsOpen &&
          nodemailerSetting.map((el, i) => {
            return (
              <LabelInputWrapper
                id={
                  darkTheme
                    ? el.nameForTemplate + "Dark"
                    : el.nameForTemplate + "Light"
                }
                className={darkTheme ? "dark-theme" : "light-theme"}
              >
                {/* <label htmlFor="">Name: </label> */}
                <input
                  type="text"
                  name={el.nameForTemplate}
                  onChange={onNodemailerInputChangeHandler}
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
  h2 {
    color: var(--textColor);
    text-align: left;
    padding: 1rem 2rem;
    font-size: 1.5rem;
    letter-spacing: 1.5px;
  }
`;

const InnerFormWrapper = styled.div`
  margin: 1rem auto;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SelectAllWrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  &.light-theme {
    span {
      color: var(--backgroundColor);
    }
  }
  &.dark-theme {
    span {
      color: var(--lightBackgroundColor);
    }
  }
`;

const EditorInputWrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  label {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  &.light-theme {
    span {
      color: var(--backgroundColor);
    }
  }
  &.dark-theme {
    span {
      color: var(--lightBackgroundColor);
    }
  }
`;

const LabelInputWrapper = styled.div`
  width: 100%;
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
  select:focus {
    border: #0ba47e 1px solid;
    outline: none;
  }
`;
