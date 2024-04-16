import React, { Component } from "react";
import ConnectButton from "./ConnectButton";
import NavigateRoute from "./NavigateRoute";

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="routes">
          <NavigateRoute to={"/"} text={"Главная"} />

          <NavigateRoute to={"/summaries"} text={"Резюме"} />
          <NavigateRoute to={"/vacancies"} text={"Вакансии"} />
        </div>
        <ConnectButton />
      </div>
    );
  }
}
