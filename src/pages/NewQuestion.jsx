import React from "react";
import axios from "axios";
import Question from "../components/Question";
import { addNewQuestion } from "../services/questions";

class NewQuestion extends React.Component {
  state = {
    questions: [],
    search: "",
    question: "",
    topic: "",
    author: "",
    tags: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const question = {
      question: this.state.question,
      author: this.state.author,
      topic: this.state.topic,
      tags: this.state.tags,
    };
    addNewQuestion(question).then((res) => {
      console.log("res:", res);
      if (!res.status) {
        // deal with the error
        return;
      }
    });
  };

  handleChange = (event) => {
    console.log(event.target.name, ": ", event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="question"
          value={this.state.question}
          onChange={this.handleChange}
          placeholder="Type your question here"
        />
        <input
          type="text"
          name="tags"
          value={this.state.tags}
          onChange={this.handleChange}
          placeholder="Type your Tags"
        />
        <input
          type="text"
          name="author"
          onChange={this.handleChange}
          value={this.state.author}
          placeholder="Type your name here"
        />
        <input
          type="text"
          name="topic"
          value={this.state.topic}
          onChange={this.handleChange}
          placeholder="Type your topic here"
        />
        <button type="submit">Submit this question</button>
      </form>
    );
  }
}

export default NewQuestion;
