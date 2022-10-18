import React from "react";
import ReactDOM from "react-dom";
import EmployeeDetails from "./Components/EmployeeDetails"
import ProductDetails from "./Components/ProductDetails"
import GridExcelExport from "./Components/GridExcelExport"
import ProductDetailsExports from "./Components/ProductDetailsExports"
import '@progress/kendo-theme-default/dist/all.css';

const App = () => (
  <>
  <EmployeeDetails />
  <ProductDetails />
  <ProductDetailsExports />
  <GridExcelExport />
  </>
);

ReactDOM.render(
  <App />,
  document.getElementById("root")
);