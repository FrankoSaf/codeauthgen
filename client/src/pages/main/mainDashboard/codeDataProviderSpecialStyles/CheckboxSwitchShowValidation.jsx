import React, { useContext } from "react";
import { Context } from "../../../../store/Context.js";
import { Input, Slider, InputWrapper } from "./CheckboxSwitchStyles";
export default function CheckboxSwitch() {
  const { setShowValidation, showValidation } = useContext(Context);

  return (
    <InputWrapper>
      <Input
        type="checkbox"
        onClick={(e) =>
          setShowValidation((prev) => {
            e.stopPropagation();
            return { ...prev, isChecked: e.target.checked };
          })
        }
      />
      <Slider />
    </InputWrapper>
  );
}
