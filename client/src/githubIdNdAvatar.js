import React, { Component } from "react";
import "./index.css";

class GetGithubIdNdAvatar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  fetchDeveloperDetails = () => {    
    this.props.fetchDeveloperDetails(this.props.githubId);
  };

  async componentDidMount() {}

  componentDidUpdate(a, b) {}

  render() {
    return (
      <div onClick={this.fetchDeveloperDetails} className="github-id-nd-avatar">
        <img
          id="avatar"
          alt={this.props.avatarUrl}
          src={this.props.avatarUrl}
        />
        <span id="github-id">{this.props.githubId}</span>
        <span id="north-east-icon">&#8599;</span>
      </div>
    );
  }
}

export default GetGithubIdNdAvatar;
