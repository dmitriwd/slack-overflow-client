import React, { Component } from "react";
import { getSingleQuestion, updateSingleQuestion } from "../services/questions";

export default class EditPage extends Component {
  state = {
    question: null,
  };

  componentDidMount = () => {
    getSingleQuestion(this.props.match.params.id).then((question) => {
      console.log("question:", question);
      this.setState({
        question,
      });
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      question: {
        [name]: value,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    updateSingleQuestion(this.props.match.params.id, this.state.question).then(
      (res) => {
        if (!res.status) {
          //  deal with the error
          return;
        }
        console.log("res:", res);
        this.props.history.push("/");
        //  was successful
      }
    );
  };

  render() {
    if (!this.state.question) {
      return <div>Loading ...</div>;
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="question">Question</label>
          <input
            type="text"
            id="question"
            name="question"
            value={this.state.question.question}
            onChange={this.handleChange}
          />
          <label htmlFor="topic">Topic</label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={this.state.question.topic}
            onChange={this.handleChange}
          />
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={this.state.question.tags}
            onChange={this.handleChange}
          />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    );
  }
}
