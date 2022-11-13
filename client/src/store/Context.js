import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../assets/api/api";
const Context = createContext();

function ContextProvider({ children }) {
  // User States
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Modal and project name
  const [templateName, setTemplateName] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // Notifications
  const [open, setOpen] = useState(false);

  // Input States
  // this state is to get finalDataToSend
  const [finalDataToSend, setFinalDataToSend] = useState({})
  const [inputError, setInputError] = useState("");
  const [input, setInput] = useState({ required: false, unique: false });
  const [arrOfPackages, setArrOfPackages] = useState([]);
  const [arrOfFrontend, setArrOfFrontEnd] = useState([]);
  const [inputType, setInputType] = useState();
  const [inputsEditorOpen, setInputsEditorOpen] = useState(true);
  const [backendEditorOpen, setBackendEditorOpen] = useState(false);
  const [frontendEditorOpen, setFrontendEditorOpen] = useState(true);
  const [inputsDisplayOpen, setInputsDisplayOpen] = useState(false);
  const [nodemailerSettingsOpen, setNodemailerSettingsOpen] = useState(false);
  const [nodemailerOnChange, setNodemailerOnChange] = useState({});
  const [arrOfNodemailer, setArrOfNodemailer] = useState([]);
  const [serverInitFormOpen, setServerInitFormOpen] = useState(false);
  const [serverInitOnChange, setServerInitOnChange] = useState({});
  const [arrOfServerInit, setArrOfServerInit] = useState([]);
  const [arrOfInputs, setArrOfInputs] = useState(() => {
    return JSON.parse(localStorage.getItem("inputs")) || [];
  });
  const [arrOfRegistrationInputs, setArrOfRegistrationInputs] = useState(() => {
    return JSON.parse(localStorage.getItem("registrationInputs")) || [];
  });
  const [arrOfLoginInputs, setArrOfLoginInputs] = useState(() => {
    return JSON.parse(localStorage.getItem("loginInputs")) || [];
  });
  const [templates, setTemplates] = useState(() => {
    return localStorage.getItem("templates") !== "undefined"
      ? JSON.parse(localStorage.getItem("templates"))
      : {};
  });
  const [mainTemplateSelectedRadio, setMainTemplateSelectedRadio] = useState();
  const [showValidation, setShowValidation] = useState({ isChecked: false });
  const [htmlInputTag, setHtmlInputTag] = useState("");

  const [selectedRadio, setSelectedRadio] = useState();
  const [profileTemplates, setProfileTemplates] = useState({});

  const [darkTheme, setDarkTheme] = useState(true);
  // TRACKING falseTHE CHANGE OF INPUT TYPES AND SETTING THEM TO THE STATE

  const onInputChangeHandler = (e) => {
    let inputValue = e.target.value;
    if (e.target.name === "required" || e.target.name === "unique")
      inputValue = e.target.checked;
    if (e.target.name === "type") setInputType(inputValue);
    setInput((prev) => {
      return {
        ...prev,
        [e.target.name]: inputValue,
      };
    });
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/userToRender`)
      .then((data) => {
        setUser(data.data);
      })
      .catch((err) => console.log(err));

    (async () => {
      const data = await axios.get(`${baseUrl}/code`);
      console.log("data", data);
      if (data?.data?.user) {
        setTemplates(data.data.code);
      } else {
        console.log("redirect to login");
      }
    })();
  }, []);
  // useEffect(() => {}, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        input,
        setInput,
        arrOfPackages,
        setArrOfPackages,
        arrOfFrontend,
        setArrOfFrontEnd,
        inputType,
        setInputType,
        arrOfInputs,
        setArrOfInputs,
        arrOfRegistrationInputs,
        setArrOfRegistrationInputs,
        arrOfLoginInputs,
        setArrOfLoginInputs,
        templates,
        setTemplates,
        showValidation,
        setShowValidation,
        htmlInputTag,
        setHtmlInputTag,
        onInputChangeHandler,
        selectedRadio,
        setSelectedRadio,
        openModal,
        setOpenModal,
        templateName,
        setTemplateName,
        profileTemplates,
        setProfileTemplates,
        inputsEditorOpen,
        backendEditorOpen,
        frontendEditorOpen,
        inputsDisplayOpen,
        setInputsEditorOpen,
        setBackendEditorOpen,
        setFrontendEditorOpen,
        setInputsDisplayOpen,
        nodemailerSettingsOpen,
        setNodemailerSettingsOpen,
        nodemailerOnChange,
        setNodemailerOnChange,
        setArrOfNodemailer,
        arrOfNodemailer,
        mainTemplateSelectedRadio,
        setMainTemplateSelectedRadio,
        serverInitFormOpen,
        setServerInitFormOpen,
        serverInitOnChange,
        setServerInitOnChange,
        arrOfServerInit,
        setArrOfServerInit,
        inputError,
        setInputError,
        open,
        setOpen,
        darkTheme,
        setDarkTheme,
        finalDataToSend, 
        setFinalDataToSend
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
