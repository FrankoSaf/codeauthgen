import React from "react";
import errorPage from "../assets/images/errorPage.png";
export default function ErrorPage() {
  return (
    <div
      style={{
        height: "80vh",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      <img src={errorPage} alt="error page" />
    </div>
  );
}
