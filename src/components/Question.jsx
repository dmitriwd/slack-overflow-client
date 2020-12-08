import React from "react";
import { Link } from "react-router-dom";

const Question = (props) => {
  console.log("props:", props);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        border: "1px dashed red",
        marginBlock: "1em",
        padding: "1em",
        textDecoration: "none",
        color: "darkgray",
      }}
    >
      <div>
        <Link
          to={`/question/${props._id}`}
          style={{ color: "black", textDecoration: "none" }}
        >
          <h5 style={{ margin: "0" }}>{props.question}</h5>
          <div>{props.author.username}</div>
        </Link>
      </div>
      {/* {props?.user?._id === props.author._id && ( */}
      {props.user && props.user._id === props.author._id && (
        <Link to={`/edit/${props._id}`}>Take me to edit</Link>
      )}
      {/* <button onClick={() => props.deleteQuestion(props.id)}>Remove</button> */}
    </div>
  );
};

export default Question;
