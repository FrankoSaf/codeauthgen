import React, { useContext } from "react";
import { Context } from "../../../../store/Context.js";
import { Input, Slider, InputWrapper } from "./CheckboxSwitchStyles";
export default function CheckboxSwitchSelectAllBackendSettings() {
  const {
    setArrOfPackages,
    nodemailerSettingsOpen,
    setNodemailerSettingsOpen,
  } = useContext(Context);

  // FUNCTION FOR SELECTING ALL BACKEND PACKAGES CHECKBOXES
  const selectAllPackagesHandler = (e) => {
    let selectAll = document.querySelector(".selectAllCheckBoxesPackages");
    if (selectAll.checked) {
      setNodemailerSettingsOpen(!nodemailerSettingsOpen);
      document.querySelectorAll(".checkBoxPackages").forEach((el) => {
        el.checked = true;
        setArrOfPackages((prev) => {
          return [...prev, { [el.name]: el.checked }];
        });
      });
    } else if (selectAll.checked === false) {
      setNodemailerSettingsOpen(!nodemailerSettingsOpen);
      document.querySelectorAll(".checkBoxPackages").forEach((el) => {
        el.checked = false;
        setArrOfPackages([]);
      });
    }
  };
  return (
    <InputWrapper>
      <Input
        type="checkbox"
        name="selectAll"
        id=""
        className="selectAllCheckBoxesPackages"
        onChange={selectAllPackagesHandler}
      />
      <Slider />
    </InputWrapper>
  );
}
