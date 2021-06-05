import React from "react";
import "./index.css";
import GetLinkHeadingNdLogo from "./linkHeadingNdLogo";
import GetLinkInputBox from "./linkInputBox";

function GetWebsiteInfo(props) {
  let { logo, linkLabel, name } = props.linkDetail;
  let { onChange, value } = props;
  return (
    <div>
      <GetLinkHeadingNdLogo logo={logo} linkLabel={linkLabel} />
      <GetLinkInputBox onChange={onChange} value={value} name={name} />
    </div>
  );
}

export default GetWebsiteInfo;
