import React, { useContext } from "react";
import { Context } from "../../../../store/Context.js";
import { Input, Slider, InputWrapper } from "./CheckboxSwitchStyles";

export default function CheckboxSwitchUnique() {
  const { setInputType, setInput, input } = useContext(Context);
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
  return (
    <InputWrapper>
      <Input
        type="checkbox"
        name="unique"
        checked={input.unique}
        onChange={onInputChangeHandler}
      />
      <Slider />
    </InputWrapper>
  );
}
