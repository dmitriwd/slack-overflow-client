import React, { Component } from "react";
import axios from "axios";

// button.addEventListener("click")

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    // this.setState({
    //    [event.target.name]:event.target.value
    // })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("SUBMITTING FORM TO OUR BACKEND", this.state);
    // pretty please do a post request 🙏
    axios
      .post("http://localhost:5005/auth/signup", this.state)
      .then((response) => {
        console.log("response:", response);
        localStorage.setItem("accessToken", response.data.accessToken);
        this.props.authenticate(response.data.user);
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };

  render() {
    console.log("PROPS", this.props);
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Signup</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
