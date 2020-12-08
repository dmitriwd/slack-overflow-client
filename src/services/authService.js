import axios from "axios";

const authService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/auth`,
});

export function signup(credentials) {
  return authService
    .post("/signup", credentials)
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

export function login(credentials) {
  return authService
    .post("/login", credentials)
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

export function getLoggedIn(accessToken) {
  return authService
    .get("/loggedin", {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((res) => {
      return res.data;
    });
}

export function logout() {
  return authService
    .delete("/logout", {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      return;
    });
}
