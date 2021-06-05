import React from "react";
import "./index.css";

function GetLinkHeadingNdLogo(props) {
  let { logo, linkLabel } = props;
  return (
    <div className="website-logo-nd-link">
      <img id="website-logo" src={logo} alt="github-logo" />
      <span id="website-link">{linkLabel}</span>
    </div>
  );
}

export default GetLinkHeadingNdLogo;
