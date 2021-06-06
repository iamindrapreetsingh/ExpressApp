import React, { Component } from "react";
import "./index.css";
import GetDivider from "./divider";
import GetGithubRepoInfo from "./githubRepoInfo";

class GetDeveloperDetailsPage extends Component {
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

  goToHomePage = () => {
    document.querySelector(".non-header-section").style.display = "flex";
    document.querySelector(".header-content").style.display = "flex";
    document.querySelector(".details-page").style.display = "none";
    document.querySelector(".footer").style.marginTop = "63px";
  };

  render() {
    const {
      avatar_url,
      name,
      bio,
      location,
      company,
      blog,
      github_id,
      linkedin_id,
      medium_id,
      codechef_id,
      hackerrank_id,
      twitter_id,
      repos,
    } = this.props.developerDetails;
    return (
      <div className="details-page">
        <div className="details-page-header">
          <div onClick={this.goToHomePage} id="details-page-header-left-text">
            The Developer Profile
          </div>
          <div onClick={this.goToHomePage} id="details-page-header-right-text">
            All Developers
          </div>
        </div>
        <div className="avatar-and-summary">
          <img id="details-page-avatar" src={avatar_url} alt={avatar_url} />
          <div id="developer-summary">
            <div id="developer-name">{name}</div>
            <div id="developer-bio">{bio}</div>
            <div id="developer-web-links">
              <a href={"https://www.github.com/" + github_id}>
                <img
                  id="details-page-github-logo"
                  className="website-links"
                  src="github.png"
                  alt=""
                />
              </a>
              <a href={hackerrank_id}>
                <img
                  className="website-links"
                  src="hackerrank.png"
                  alt="hackerrank.png"
                />
              </a>
              <a href={codechef_id}>
                <img
                  className="website-links"
                  src="codechef.png"
                  alt="codechef.png"
                />
              </a>
              <a href={linkedin_id}>
                <img
                  className="website-links"
                  src="linkedin.png"
                  alt="linkedin.png"
                />
              </a>
              <a href={medium_id}>
                <img
                  className="website-links"
                  src="medium.png"
                  alt="medium.png"
                />
              </a>
              <a href={twitter_id}>
                <img
                  className="website-links"
                  src="twitter.png"
                  alt="twitter.png"
                />
              </a>
            </div>
            <div className="developer-other-details">
              {location && (
                <img
                  className="other-details-logo"
                  alt="Location"
                  src="location.svg"
                />
              )}
              <div className="other-details-text">{location}</div>
              {company && (
                <img
                  className="other-details-logo"
                  alt="Company"
                  src="company.svg"
                />
              )}
              <div className="other-details-text">{company}</div>
              {blog && (
                <img
                  className="other-details-logo"
                  alt="companyWebsite"
                  src="company-website.svg"
                />
              )}
              {blog && blog.includes("http") ? (
                <a id="blog" href={blog}>
                  <div className="other-details-text">{blog}</div>
                </a>
              ) : (
                <a id="blog" href={"https://" + blog}>
                  <div className="other-details-text">{blog}</div>
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="developer-repo-detail">
          <div id="github-repo-heading">Github Repositories</div>
          <GetDivider width="1340px"></GetDivider>
          {repos &&
            repos.map((repo) => (
              <GetGithubRepoInfo key={repo.html_url} repo={repo} />
            ))}
        </div>
      </div>
    );
  }
}

export default GetDeveloperDetailsPage;
