import React, { Component } from "react";
import axios from "axios";
import Question from "../components/Question";

export default class SingleQuestionPage extends Component {
  state = {
    questionInfo: null,
  };

  componentDidMount = () => {
    axios
      .get(`http://localhost:5005/question/${this.props.match.params.id}`)
      .then((res) => {
        console.log("res:", res);
        this.setState({
          questionInfo: res.data,
        });
      });
  };

  render() {
    if (!this.state.questionInfo) {
      return <div>Loading...</div>;
    }

    console.log(this.state);
    return <Question {...this.state.questionInfo} />;
  }
}
