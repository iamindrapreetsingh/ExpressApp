import React from "react";
import "./index.css";

function GetHeader() {
  return (
    <header className="header">
      <div className="header-content">
        <div id="header-text">
          <div>The Developer</div>
          <div>Repository</div>
        </div>
        <div id="header-img-div">
          <img id="header-img" src="header-image.png" alt="header-img" />
        </div>
      </div>
    </header>
  );
}

export default GetHeader;
