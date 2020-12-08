import axios from "axios";

const questionService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/question`,
});

export function addNewQuestion(question) {
  // const accessToken = localStorage.getItem("accessToken")
  return questionService
    .post("/new", question, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then((response) => {
      return {
        status: true,
        data: response.data,
      };
    })
    .catch((err) => {
      console.log("INSINDE THE CATCH");
      console.log(err.response);
      return {
        status: false,
        errorMessage: err.response.data.errorMessage,
      };
    });
}

export function getSingleQuestion(id) {
  return questionService.get(`/${id}`).then((res) => {
    return res.data;
  });
}

export function updateSingleQuestion(id, info) {
  return questionService
    .put(`/${id}`, info, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then((response) => {
      return {
        status: true,
        data: response.data,
      };
    })
    .catch((err) => {
      console.log("INSINDE THE CATCH");
      console.log(err.response);
      return {
        status: false,
        errorMessage: err.response.data.errorMessage,
      };
    });
}

export function getAllQuestions() {
  return questionService.get("/").then((res) => res.data);
}
