import React from "react";
import "./loading.css";

const Loading = ({ cssClass }) => {
  return (
    <main className={"loading-wrapper " + (cssClass || "")}>
      <div id="loading-spinner"></div>
    </main>
  );
};

export default Loading;
