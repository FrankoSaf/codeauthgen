import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const usePasswordToggle = () => {
  const [visible, setVisibility] = useState(false);

  const Icon = visible ? (
    <FaEye
      icon={visible ? "eye-slash" : "eye"}
      style={{ color: `#1C183F` }}
      onClick={() => setVisibility((visiblity) => !visiblity)}
    />
  ) : (
    <FaEyeSlash
      icon={visible ? "eye-slash" : "eye"}
      style={{ color: `#1C183F` }}
      onClick={() => setVisibility((visiblity) => !visiblity)}
    />
  );

  const InputType = visible ? "text" : "password";

  return [InputType, Icon];
};

export default usePasswordToggle;
