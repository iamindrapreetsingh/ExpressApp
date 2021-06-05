import React, { Component } from "react";
import "./index.css";
import GetWebsiteInfo from "./websiteInfo";
import GetLinkHeadingNdLogo from "./linkHeadingNdLogo";
import axios from "axios";

const logoAndLinkLabel = [
  {
    logo: "linkedin.png",
    linkLabel: "Linkedin",
    name: "linkedin",
  },

  {
    logo: "Codechef.png",
    linkLabel: "Codechef",
    name: "codechef",
  },

  {
    logo: "hackerrank.png",
    linkLabel: "Hackerrank",
    name: "hackerrank",
  },

  {
    logo: "twitter.png",
    linkLabel: "Twitter",
    name: "twitter",
  },

  {
    logo: "medium.png",
    linkLabel: "Medium",
    name: "medium",
  },
];

class GetModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      github: "",
      linkedin: "",
      codechef: "",
      hackerrank: "",
      twitter: "",
      medium: "",
    };
  }

  async fetchUsers() {
    const response = await fetch("http://localhost:7000/api/developers");
    const data = await response.json();
    return data;
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    document.querySelector("#github-id-error").style.display = "none";
    const requestPayload = {
      codechef_id: this.state.codechef,
      github_id: this.state.github,
      hackerrank_id: this.state.hackerrank,
      linkedin_id: this.state.linkedin,
      medium_id: this.state.medium,
      twitter_id: this.state.twitter,
    };
    axios
      .post("http://localhost:7000/api/developers", requestPayload)
      .then((response) => {
        this.props.changeStateFunc();

        //alert on browser
        alert("User added Successfully!!");

        const modal = document.querySelector(".modal");
        modal.style.display = "none";
        document.querySelector(".non-header-section").style.display = "flex";
        document.querySelector(".footer").style.display = "flex";
        document.documentElement.scrollTop = 0;
        return;
      })
      .catch((err) => {
        const githubErrorMessage = document.querySelector("#github-id-error");
        if (err.response.status === 409) {
          githubErrorMessage.style.display = "block";
          githubErrorMessage.innerHTML = "User already exists!!";
          githubErrorMessage.style.borderColor = "red";
        } else if (err.response.status === 400) {
          githubErrorMessage.style.display = "block";
          githubErrorMessage.innerHTML = "Invalid Github id!!";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { inputBoxValue } = this.state;
    return (
      <div className="modal">
        <form onSubmit={this.submitHandler}>
          <div className="modal-content">
            <div id="modal-heading">Add a Developer's Profile</div>

            <div>
              <GetLinkHeadingNdLogo logo="github.png" linkLabel="Github*" />
              <input
                onChange={this.changeHandler}
                defaultValue={inputBoxValue}
                className="link-input-box"
                type="text"
                name="github"
                required
              />
              <div id="github-id-error">Invalid github id!!</div>
            </div>

            {logoAndLinkLabel.map((linkDetail) => (
              <GetWebsiteInfo
                onChange={this.changeHandler}
                value={inputBoxValue}
                linkDetail={linkDetail}
                key={linkDetail.name}
              />
            ))}

            <div className="cancel-nd-submit">
              <label id="cancel-label">Cancel</label>
              <a href=".header">
                <input type="submit" id="submit-btn" value="submit" />
              </a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default GetModal;
