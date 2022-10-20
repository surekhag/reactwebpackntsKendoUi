import * as React from 'react';
import {
  Grid,
  GridColumn as Column,
  GridPageChangeEvent,
  GridFilterChangeEvent,
  GridToolbar,
} from "@progress/kendo-react-grid";
// import { Grid, GridColumn as Column, GridFilterChangeEvent } from '@progress/kendo-react-grid';
import { filterBy, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import products from "../Configs/Products.json";

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

const initialFilter: CompositeFilterDescriptor  = {
    logic: "and",
    filters: [
        { field: "ProductName", operator: "contains", value: "Chef" }
    ]
}

const GridFilterExcelExport = (): JSX.Element => {

  const _export = React.useRef<ExcelExport | null>(null);
  const _grid = React.useRef<any>();
  const [page, setPage] = React.useState<PageInterface>({ skip: 0, take: 10 });

  const excelExport = () => {
    if (_export.current !== null) {
      _export.current.save(gridData);
    }
  };



    const [filter, setFilter] = React.useState(initialFilter);
    // const [dataState, setDataState] = React.useState<State>(initialDataState);
    
    const [gridData, setData] = React.useState<State>();
  
   React.useEffect(()=>{
    let temp = filterBy(products, filter).slice(page.skip, page.skip + page.take)
    setData([...temp])
   }, [filter]);
    return (<>
      <h3> Grid with Filter</h3>
      <ExcelExport ref={_export}>
      <Grid
        style={{ height: '420px' }}
        data={filterBy(products, filter).slice(page.skip, page.skip + page.take)}
        filterable={true}
        filter={filter}
        onFilterChange={(e: GridFilterChangeEvent) => setFilter(e.filter)}


        onPageChange={(e: GridPageChangeEvent) => setPage(e.page)}
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

        <Column field="ProductID" title="ID" filterable={false} width="60px" />
        <Column field="ProductName" title="Product Name" width="240px" />
        <Column field="FirstOrderedOn" width="240px" filter="date" format="{0:d}" />
        <Column field="UnitPrice" width="180px" filter="numeric" format="{0:c}" />
        <Column field="Discontinued" width="190px" filter="boolean" />
      </Grid>
      </ExcelExport>
      </>
    );
}

export default GridFilterExcelExport;