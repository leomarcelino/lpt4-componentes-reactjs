import React, { Component } from "react";

export default class GithubRepos extends Component {
  state = {
    repos: []
  };

  async atualizarRepos() {
    let { username } = this.props;

    if (!username) {
      username = "leonardom";
    }

    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    const repos = await response.json();

    this.setState({ repos });
  }

  componentDidMount() {
    this.atualizarRepos();
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.atualizarRepos();
    return true;
  }

  render() {
    const { repos } = this.state;
    return (
      <ul>
        {repos.map(repo => {
          return (
            <li key={repo.id}>
              <strong>{repo.name}</strong>
              &nbsp;<a href={repo.html_url}>{repo.html_url}</a>
            </li>
          );
        })}
      </ul>
    );
  }
}
