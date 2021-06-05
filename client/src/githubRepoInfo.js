import React from "react";
import GetDivider from "./divider";
import "./index.css";

function GetGithubRepoInfo(props) {

  const {name,html_url,description,updated_at} = props.repo;

  return (
    <div>
      <div className="repo-name-and-desc">
        <a href={html_url} id="repo-link"><span id="repo-name">{name}</span></a>
        <span id="repo-north-arrow">&#8599;</span>
        <span id="repo-created-at">{updated_at}</span>
      </div>
      <div id="repo-desc">{description}</div>
      <GetDivider width="30px" marginTop="10px"></GetDivider>
    </div>
  );
}

export default GetGithubRepoInfo;
