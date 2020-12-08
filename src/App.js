import axios from "axios";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import NormalRoute from "./fakecomponents/NormalRoutes";
import ProtectedRoutes from "./fakecomponents/ProtectedRoutes";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LoginPage";
import NewQuestion from "./pages/NewQuestion";
import NotFound from "./pages/NotFound";
import SingleQuestionPage from "./pages/SingleQuestionPage";
import Signup from "./pages/Singup";
import { logout, getLoggedIn } from "./services/authService";

class App extends React.Component {
  state = {
    user: null,
    isLoading: true,
  };

  authenticate = (user) => {
    this.setState({ user: user });
  };

  logout = () => {
    const accessToken = localStorage.getItem("accessToken"); // 43562390567435986743 || null
    logout()
      .then((response) => {
        localStorage.removeItem("accessToken");
        this.authenticate(null);
      })
      .catch((err) => {
        localStorage.removeItem("accessToken");
        this.authenticate(null);
      });
  };

  componentDidMount = () => {
    const accessToken = localStorage.getItem("accessToken"); // 43562390567435986743 || null
    console.log("accessToken:", accessToken);
    getLoggedIn(accessToken).then((response) => {
      console.log(response);
      this.setState({
        user: response.data.user,
        isLoading: false,
      });
    });
  };

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <div style={{ margin: "0 auto", maxWidth: "768px" }} className="App">
        <Navbar logout={this.logout} user={this.state.user} />
        <h3 style={{ textAlign: "center" }}>Slack overflow</h3>
        <Switch>
          <NormalRoute
            exact
            path="/"
            component={HomePage}
            user={this.state.user}
          />
          <Route exact path="/question/:id" component={SingleQuestionPage} />
          <ProtectedRoutes
            exact
            path="/edit/:id"
            component={EditPage}
            user={this.state.user}
          />
          {/* <Route
            exact
            path="/signup"
            render={(routerProps) => (
              <Signup {...routerProps} authenticate={this.authenticate} />
            )}
          /> */}

          <NormalRoute
            exact
            path="/signup"
            component={Signup}
            authenticate={this.authenticate}
          />

          {/* {this.state.user && (
            <Route exact path="/protected" component={ProtectedPage} />
          )} */}
          {/* {this.state.user ? (
            <Route
              exact
              path="/protected"
              render={(routerProps) => (
                <ProtectedPage
                  {...routerProps}
                  user={this.state.user}
                  authenticate={this.authenticate}
                />
              )}
            />
          ) : (
            <Route component={LogIn} />
          )} */}

          <ProtectedRoutes
            exact
            path="/protected"
            component={NewQuestion}
            user={this.state.user}
          />

          {/* <ProtectedRoutes
            exact
            path="/protected"
            component={ProtectedPage}
            user={this.state.user}
            authenticate={this.authenticate}
          /> */}

          {/* <ProtectedRoutes
            exact
            path="/admin"
            component={AdminComponent}
            user={this.state.user}
          />

          <ProtectedRoutes
            exact
            path="/profile"
            component={ProfilePage}
            user={this.state.user}
          /> */}

          <Route
            exact
            path="/login"
            render={(routerProps) => (
              <LogIn {...routerProps} authenticate={this.authenticate} />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
