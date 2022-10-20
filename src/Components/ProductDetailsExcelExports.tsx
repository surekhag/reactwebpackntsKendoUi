// ES2015 module syntax
import React from "react";
import {
  Grid,
  GridColumn,
  GridPageChangeEvent,
  GridToolbar,
} from "@progress/kendo-react-grid";
import products from "../Configs/Products.json";
import '@progress/kendo-theme-default/dist/all.css';
import { process, State } from "@progress/kendo-data-query";
import {
  ExcelExport,
  ExcelExportColumn,
  ExcelExportColumnGroup,
} from "@progress/kendo-react-excel-export";


interface PageInterface {
  skip: number;
  take: number;
}

const initialDataState: State = {
  sort: [{ field: "code", dir: "asc" }],
  take: 10,
  skip: 0,
};
const ProductDetailsExcelExports = (): JSX.Element => {
  const _export = React.useRef<ExcelExport | null>(null);
  const _grid = React.useRef<any>();
  const [page, setPage] = React.useState<PageInterface>({ skip: 0, take: 10 });

  const excelExport = () => {
    if (_export.current !== null) {
      _export.current.save(products.slice(page.skip, page.skip + page.take));
    }
  };

  const GridComp =
    <Grid
      data={products.slice(page.skip, page.skip + page.take)}
      onPageChange={(e: GridPageChangeEvent) => {

        setPage(e.page)
      }}
      total={products.length}
      skip={page.skip}
      pageable={true}
      pageSize={page.take}
      ref={_grid}
    >
      <GridToolbar>
        <button
          title="Export Excel"
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          onClick={excelExport}
        >
          Export to Excel
        </button>
      </GridToolbar>
      <GridColumn field="ProductID" title="ID" width="40px" />
      <GridColumn field="ProductName" title="Name" width="250px" />
      <GridColumn field="Category.CategoryName" title="CategoryName" />
      <GridColumn field="UnitPrice" title="Price" />
      <GridColumn field="UnitsInStock" title="In stock" />
    </Grid>


  return (<>
    <h3> Kendo UI Grid with Excel export(All records)</h3>
    <ExcelExport ref={_export}>
      {GridComp}
    </ExcelExport>
  </>);
}
export default ProductDetailsExcelExports;