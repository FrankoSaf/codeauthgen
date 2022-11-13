import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Context } from "../../../store/Context.js";
import InputsForm from "./templateEditorForms/InputsForm";
import InputsSyntaxDisplay from "./templateEditorForms/InputsSyntaxDisplay";
import BackendForm from "./templateEditorForms/BackendForm";
import MainTemplateToChooseForm from "./templateEditorForms/MainTemplateToChooseForm";
import SaveTemplateToDB from "./templateEditorForms/SaveTemplateToDB";
import Modal from "../../../components/UI/Modal.jsx";
import ServerInitForm from "./templateEditorForms/ServerInitForm";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { TbHandClick } from "react-icons/tb";
import { baseUrl } from "../../../assets/api/api.js";

export default function InputForm() {
  const {
    arrOfPackages,
    setArrOfPackages,
    arrOfInputs,
    setArrOfInputs,
    arrOfRegistrationInputs,
    setArrOfRegistrationInputs,
    arrOfLoginInputs,
    setArrOfLoginInputs,
    selectedRadio,
    setTemplates,
    templates,
    templateName,
    setTemplateName,
    openModal,
    setOpenModal,
    isLoggedIn,
    inputsEditorOpen,
    backendEditorOpen,
    frontendEditorOpen,
    inputsDisplayOpen,
    setInputsEditorOpen,
    setBackendEditorOpen,
    setFrontendEditorOpen,
    setInputsDisplayOpen,
    arrOfNodemailer,
    mainTemplateSelectedRadio,
    serverInitFormOpen,
    setServerInitFormOpen,
    arrOfServerInit,
    darkTheme,
    user,
    setOpen,
    setFinalDataToSend,
  } = useContext(Context);

  const [errorMessage, setErrorMessage] = useState("");

  // SUBMIT DATA TO BACKEND FUNCTION

  const sendToBackEndHandler = () => {
    const newObjBackendPackages = arrOfPackages.reduce((acc, item) => {
      return { ...acc, ...item };
    }, {});

    if (arrOfInputs.length === 1) {
      arrOfInputs.push({ ...arrOfInputs[0], main: true });
      arrOfInputs.shift();
    }

    const newArrInputs = arrOfInputs.map((item) => {
      if (item.name === selectedRadio) {
        return { ...item, main: true };
      }
      return item;
    });

    const newArrLogInputs = arrOfLoginInputs.map((item) => {
      if (item.name === selectedRadio) {
        return { ...item, main: true };
      }
      return item;
    });

    const finalDataToSend = {
      templateName,
      ...arrOfServerInit,
      registrationInputs: newArrInputs,
      loginInputs: newArrLogInputs,
      backend_packages: newObjBackendPackages,
      nodemailerSetting: arrOfNodemailer,
      template: mainTemplateSelectedRadio,
    };
    // save finalDataToSend
    setFinalDataToSend(finalDataToSend);

    axios
      .post(`${baseUrl}/code/generated-code`, finalDataToSend)
      .then((data) => {
        setTemplates(data.data);
        setArrOfInputs([]);
        setArrOfRegistrationInputs([]);
        setArrOfLoginInputs([]);
        setArrOfPackages([]);
      })
      .catch((err) => console.log(err.response.data));
  };

  const saveToDataBase = async () => {
    const finalData = { ...templates, createdBy: user._id, templateName };

    setOpenModal(true);

    try {
      const data = await axios.post(`${baseUrl}/code/saveTemplate`, finalData);
      console.log(data);
      setOpen(true);
      setOpenModal(false);
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data);
    }
  };

  // STORING THE ARRAYS OF INPUTS TO LOCAL STORAGE :

  useEffect(() => {
    localStorage.setItem("inputs", JSON.stringify(arrOfInputs));
  }, [arrOfInputs]);

  useEffect(() => {
    localStorage.setItem(
      "registrationInputs",
      JSON.stringify(arrOfRegistrationInputs)
    );
  }, [arrOfRegistrationInputs]);

  useEffect(() => {
    localStorage.setItem("loginInputs", JSON.stringify(arrOfLoginInputs));
  }, [arrOfLoginInputs]);

  // console.log('1111', templates, isLoggedIn);

  return (
    <>
      <EditorContainer>
        <div
          data-tour="first-step"
          style={{ borderRadius: ".5rem" }}
          className="editor-on"
        >
          <Button
            onClick={() => {
              setInputsEditorOpen(!inputsEditorOpen);
            }}
            className={darkTheme ? "dark-mode" : "light-mode"}
          >
            <div>
              <span>INPUTS EDITOR</span>{" "}
              {inputsEditorOpen ? <ArrowUp /> : <ArrowDown />}
            </div>
          </Button>
          {inputsEditorOpen && <InputsForm className="one" />}
        </div>
        <div data-tour="second-step" className="editor-on">
          <Button
            onClick={() => {
              setInputsDisplayOpen(!inputsDisplayOpen);
            }}
            className={darkTheme ? "dark-mode" : "light-mode"}
          >
            <div>
              <span>EDITED INPUTS</span>{" "}
              {inputsDisplayOpen ? <ArrowUp /> : <ArrowDown />}
            </div>
          </Button>
          {inputsDisplayOpen && <InputsSyntaxDisplay className="two" />}
        </div>
        <div data-tour="third-step" className="editor-on">
          <Button
            onClick={() => {
              setFrontendEditorOpen(!frontendEditorOpen);
            }}
            className={darkTheme ? "dark-mode" : "light-mode"}
          >
            <div>
              <span>AUTH METHODS</span>
              {frontendEditorOpen ? <ArrowUp /> : <ArrowDown />}
            </div>
          </Button>
          {frontendEditorOpen && <MainTemplateToChooseForm className="four" />}
        </div>
        <div data-tour="fourth-step" className="editor-on">
          <Button
            onClick={() => {
              setBackendEditorOpen(!backendEditorOpen);
            }}
            className={darkTheme ? "dark-mode" : "light-mode"}
          >
            <div>
              <span>BACKEND PACKAGES</span>{" "}
              {backendEditorOpen ? <ArrowUp /> : <ArrowDown />}
            </div>
          </Button>
          {backendEditorOpen && <BackendForm className="three" />}
        </div>
        <div className="editor-on">
          <Button
            onClick={() => {
              setServerInitFormOpen(!serverInitFormOpen);
            }}
            className={darkTheme ? "dark-mode" : "light-mode"}
          >
            <div>
              <span>SERVER INIT EDITOR </span>{" "}
              {serverInitFormOpen ? <ArrowUp /> : <ArrowDown />}
            </div>
          </Button>
          {serverInitFormOpen && <ServerInitForm className="two" />}
        </div>
        <div>
          {/* CREATE TEMPLATE BUTTON */}
          {arrOfInputs.length > 0 ? (
            <ButtonSubmit
              onClick={sendToBackEndHandler}
              className={darkTheme ? "dark-mode" : "light-mode"}
            >
              CREATE TEMPLATE
            </ButtonSubmit>
          ) : null}
        </div>

        {/* SAVE TEMPLATE TO DB */}

        <div>
          {isLoggedIn ? (
            templates?.backend ? (
              <SaveTemplateToDB
                className={darkTheme ? "dark-mode" : "light-mode"}
              />
            ) : (
              <></>
            )
          ) : (
            <Navlink
              to="/login"
              className={darkTheme ? "dark-mode" : "light-mode"}
            >
              {" "}
              <span> SAVE? CLICK HERE </span> <Save />
            </Navlink>
          )}
        </div>
        {/* {arrOfInputs.length > 0 ? (
          <>
          <ButtonSubmit
              onClick={() => setOpenModal(true)}
              data-tour="fifth-step"
              className={darkTheme ? "dark-mode" : "light-mode"}
            >
              <div>
                <span>Create Template</span> <Done />
              </div>
            </ButtonSubmit>
          </>
        ) : null} */}
      </EditorContainer>
      {openModal && (
        <Modal>
          <StyledModal className={darkTheme ? "dark-mode" : "light-mode"}>
            <div>
              <label htmlFor="">Select Template Name:</label>
              <input
                type="text"
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </div>
            {errorMessage && <p>{errorMessage}</p>}
            <Button onClick={saveToDataBase}>Save Template</Button>
          </StyledModal>
        </Modal>
      )}
    </>
  );
}

// STYLED COMPONENTS

const StyledModal = styled.div`
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: white;
  font-size: 1.5rem;
  p {
    color: red;
    font-size: 1rem;
    margin-top: 1.2rem;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    label {
      text-align: center;
    }
    input {
      margin-top: 0.7rem;
      padding: 0.2rem;
      background-color: transparent;
      font-size: 1.5rem;
      color: white;
      border: 2px white solid;
      border-radius: 0.5rem;
      &:focus {
        outline: none;
      }
    }
  }
`;

const EditorContainer = styled.div`
  height: auto;
  min-width: auto;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
  div {
    flex-basis: 100%;
  }
  @media (min-width: 900px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    div {
      width: 100%;
    }
  }
`;

const ButtonSubmit = styled.button`
  margin-top: 1rem;
  background-color: #fca311;
  width: 15rem;
  height: 1.3rem;
  margin-left: 1rem;
  border: 1px solid transparent;
  border-radius: 0.2rem;
  color: white;
  font-weight: 400;
  font-size: 0.7rem;
  transition: ease-in 0.1s all;
  letter-spacing: 2px;
  cursor: pointer;
  &.light-mode {
    color: var(--backgroundColor);
    &:hover {
      background-color: #ffb032;
      border: 1px solid var(--backgroundColor);
    }
    &:active {
      background-color: white;
    }
  }
  &:hover {
    background-color: #c47e0f;
    border: 1px solid white;
  }
  &:active {
    background-color: white;
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      margin-left: 1rem;
    }
  }
`;

const Button = styled.button`
  margin-top: 1rem;
  background-color: #fca311;
  width: 300px;
  height: 1.3rem;
  margin-left: 1rem;
  border: 1px solid transparent;
  cursor: pointer;
  border-radius: 0.2rem;
  color: white;
  font-weight: 400;
  font-family: "MyFont", sans-serif;
  font-size: 0.7rem;
  transition: ease-in 0.1s all;
  letter-spacing: 1px;
  &.light-mode {
    color: var(--backgroundColor);
    &:hover {
      background-color: #ffb032;
      border: 1px solid var(--backgroundColor);
    }
    &:active {
      background-color: white;
    }
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      margin-left: 1rem;
    }
  }
  &:hover {
    background-color: #c47e0f;
    border: 1px solid white;
  }
  &:active {
    background-color: white;
  }
`;

const ArrowUp = styled(MdKeyboardArrowUp)`
  font-size: 1rem;
  font-weight: 600;
  margin-right: 1rem;
`;

const ArrowDown = styled(MdKeyboardArrowDown)`
  font-size: 1rem;
  font-weight: 600;
  margin-right: 1rem;
`;

const Save = styled(TbHandClick)`
  font-size: 1rem;
  font-weight: 600;
`;
const Navlink = styled(NavLink)`
  margin: 1rem 0 5rem 1rem;
  background-color: #fca311;
  letter-spacing: 2px;
  width: 15rem;
  height: 1.3rem;
  border: 2px solid transparent;
  border-radius: 0.2rem;
  color: white;
  font-weight: 600;
  font-size: 0.7rem;
  transition: ease-in 0.1s all;
  padding: 0rem 1rem;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.light-mode {
    color: var(--backgroundColor);
    &:hover {
      background-color: #ffb032;
      border: 1px solid var(--backgroundColor);
    }
  }
  &:hover {
    background-color: #c47e0f;
    border: 1px solid white;
  }
  &:active {
    background-color: white;
  }
`;
