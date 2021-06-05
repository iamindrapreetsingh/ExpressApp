import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import GetHeader from "./header";
import GetNonHeaderSection from "./nonHeaderSection";

ReactDOM.render(
  <div>
    <GetHeader></GetHeader>
    <GetNonHeaderSection></GetNonHeaderSection>
  </div>,
  document.getElementById("root")
);

/**
 *
 * DOM EVENTS
 *
 *
 */

const root = document.querySelector("#root");
const modal = document.querySelector(".modal");
const addDeveloperBtn = document.querySelector("#add-developer-btn");

document.querySelector("#cancel-label").addEventListener("click", () => {
  modal.style.display = "none";
  root.style.opacity = 1;
  root.style.position = "static";
  document.querySelector(".non-header-section").style.display = "flex";
  document.querySelector(".footer").style.display = "flex";
  document.documentElement.scrollTop = 0;
});

addDeveloperBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  document.documentElement.scrollTop = 0;
  document.querySelector(".non-header-section").style.display = "none";
  document.querySelector(".footer").style.display = "none";
});
