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

import { Fade } from "@progress/kendo-react-animation";
import {
  Notification,
  NotificationGroup,
} from "@progress/kendo-react-notification";

import { Popup } from "@progress/kendo-react-popup";
interface PageInterface {
  skip: number;
  take: number;
}
interface State1 {
  success: boolean;
}
const initialDataState: State = {
  sort: [{ field: "code", dir: "asc" }],
  take: 10,
  skip: 0,
};
const ProductDetailsExcelExports = (): JSX.Element => {
  const anchor = React.useRef<HTMLButtonElement | null>(null);
  const [state, setState] = React.useState<State1>({
    success: false
});


  const [show, setShow] = React.useState(false);
  const { success } = state;
  const _export = React.useRef<ExcelExport | null>(null);
  const _grid = React.useRef<any>();
  const [page, setPage] = React.useState<PageInterface>({ skip: 0, take: 10 });

  const excelExport = () => {
    if (_export.current !== null) {
      _export.current.save(products.slice(page.skip, page.skip + page.take));
    }
    setState({success : true})
  };

  const onClick = () => {
    setShow(!show);
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
          onClick={onClick}
          ref={anchor}
        > {show ? "Hide" : "Show"}
          {/* Export to Excel */}
        </button>
        <Popup anchor={anchor.current} show={show} popupClass={"popup-content"}>
        <button
          title="Export Excel"
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          onClick={excelExport}
         > 
          Export to Excel
        </button>
      </Popup>
      </GridToolbar>
      <GridColumn field="ProductID" title="ID" width="40px" />
      <GridColumn field="ProductName" title="Name" width="250px" />
      <GridColumn field="Category.CategoryName" title="CategoryName" />
      <GridColumn field="UnitPrice" title="Price" />
      <GridColumn field="UnitsInStock" title="In stock" />
    </Grid>


  return (<>
    <h3>Grid with Excel export</h3>
    <ExcelExport ref={_export}>
      {GridComp}
    </ExcelExport>
    <NotificationGroup
                style={{
                    right: 0,
                    top: "50%",
                    alignItems: "flex-start",
                    flexWrap: "wrap-reverse",
                }}
            >
                <Fade>
                    {success && (
                        <Notification
                            type={{ style: "success", icon: true }}
                            closable={true}
                            onClose={() => setState({ ...state, success: false })}
                        >
                            <span>Employee Informetion is displayed!</span>
                        </Notification>
                    )}
                </Fade>
              </NotificationGroup>

  </>);
}
export default ProductDetailsExcelExports;