import React from "react";
import ReactDOM from "react-dom/client";
import EmployeeDetails from "./Components/EmployeeDetails"
import BasicForm from "./Components/BasicForm"
import '@progress/kendo-theme-default/dist/all.css';
import Products from "./Components/Products";
import MultiInputForm from "./Components/MultiInputForm";

const App = () => (
  <>
  <EmployeeDetails />
  <BasicForm />
  <MultiInputForm />
  <Products />
  </>
);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
