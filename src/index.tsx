import React from "react";
import ReactDOM from "react-dom";
import EmployeeDetails from "./Components/EmployeeDetails"
const App = () => (
  <EmployeeDetails />
);

ReactDOM.render(
  <App />,
  document.getElementById("root")
);