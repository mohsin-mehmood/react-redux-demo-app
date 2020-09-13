import React from "react";
import HomePage from "../components/home/HomePage";
import AboutPage from "../components/about/AboutPage";
import Header from "../components/common/Header";
import { Route, Switch } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import CoursesPage from "./courses/CoursesPage";
import ManageCoursePage from "./courses/ManageCoursePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthorsPage from "./authors/AuthorsPage";
import ManageAuthor from "./authors/ManageAuthor";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/course/:slug" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/author/:authorId" component={ManageAuthor} />
        <Route path="/author/" component={ManageAuthor} />
        <Route path="/authors" component={AuthorsPage} />

        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
