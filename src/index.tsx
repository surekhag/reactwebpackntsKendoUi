import React from "react";
import ReactDOM from "react-dom";
import EmployeeDetails from "./Components/EmployeeDetails"
import ProductDetailsPdfExports from "./Components/ProductDetailsPdfExports"
import ProductDetailsExcelExports from "./Components/ProductDetailsExcelExports"
import GridFilterExcelExport from "./Components/GridFilterExcelExport"
import '@progress/kendo-theme-default/dist/all.css';

const App = () => (
  <>
  <EmployeeDetails />
  <ProductDetailsPdfExports />
  <ProductDetailsExcelExports />
  <GridFilterExcelExport />
  </>
);

ReactDOM.render(
  <App />,
  document.getElementById("root")
);