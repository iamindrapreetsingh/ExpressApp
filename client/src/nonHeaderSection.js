import React, { Component } from "react";
import "./index.css";
import GetDivider from "./divider";
import GetGithubIdNdAvatar from "./githubIdNdAvatar";
import GetModal from "./modal";
import GetDeveloperDetailsPage from "./developerDetailsPage";
import GetFooter from "./footer";

class GetNonHeaderSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      developersList: [],
      searchBoxValue: "",
      changeState: null,
      developerDetails: [],
      searching: false,
    };
  }

  fetchDeveloperDetails = async (githubId) => {
    console.log("GithubId is - " + githubId);
    try {
      const response = await fetch(
        `http://localhost:7000/api/developers/${githubId}`
      );
      const data = await response.json();
      this.setState({ developerDetails: data });
      document.querySelector(".non-header-section").style.display = "none";
      document.querySelector(".header-content").style.display = "none";
      document.querySelector(".details-page").style.display = "flex";
      document.querySelector(".footer").style.marginTop = "0px";
      document.documentElement.scrollTop = 0;
    } catch (err) {
      console.log("Some error occurred!!");
    }
  };

  searchUser = () => {
    if (this.state.searchBoxValue.length > 0) {
      this.setState({ searching: true });
    } else {
      this.setState({ searching: false });
      this.fetchUsers();
    }
  };

  fetchUsers = async () => {
    const response = await fetch("http://localhost:7000/api/developers");
    const data = await response.json();
    this.setState({ developersList: data });
  };

  async componentDidMount() {
    this.fetchUsers();
  }

  //Changing the values between null and "randomString"
  //to make sure that the values are set different everytime
  changeStateFunc = () => {
    if (!this.state.changeState) {
      this.setState({ changeState: "randomString" });
    } else {
      this.setState({ changeState: null });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevState.changeState) !==
        JSON.stringify(this.state.changeState) &&
      !this.searching
    ) {
      this.fetchUsers();
    }
  }

  render() {
    return (
      <div>
        <div className="non-header-section">
          <div id="below-header-text">Explore Developer Profiles</div>
          <GetDivider></GetDivider>
          <div id="search-box-div">
            <input
              value={this.state.searchBoxValue}
              onChange={(e) => {
                this.setState({ searchBoxValue: e.target.value });
              }}
              placeholder="Search for Username"
              id="search-input-box"
            />
            <img
              onClick={this.searchUser}
              id="search-icon"
              alt="search-icon"
              src="search-icon.svg"
            />
          </div>
          <div className="github-id-nd-avatar-section">
            {this.state.developersList.map((user) => (
              <GetGithubIdNdAvatar
                fetchDeveloperDetails={this.fetchDeveloperDetails}
                githubId={user.github_id}
                avatarUrl={user.avatar_url}
                key={user.github_id}
              />
            ))}
          </div>
          <GetDivider></GetDivider>
          <div id="could-not-find-text">
            Could not find what you were looking for?
          </div>
          <input
            id="add-developer-btn"
            type="button"
            value="Add Developer Info"
          />
        </div>
        <GetModal changeStateFunc={this.changeStateFunc}></GetModal>
        <GetDeveloperDetailsPage
          developerDetails={this.state.developerDetails}
        ></GetDeveloperDetailsPage>
        <GetFooter></GetFooter>
      </div>
    );
  }
}

export default GetNonHeaderSection;
