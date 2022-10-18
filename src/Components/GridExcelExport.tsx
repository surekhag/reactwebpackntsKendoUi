import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Grid, GridColumn, GridToolbar,GridPageChangeEvent } from '@progress/kendo-react-grid';
import { ExcelExport, ExcelExportColumn, ExcelExportColumnGroup } from '@progress/kendo-react-excel-export';

import { process, State } from "@progress/kendo-data-query";
import products from "../Configs/Products.json";

const data = products;
 
interface PageInterface {
    skip: number;
    take: number;
  }

  
const initialDataState: State = {
    sort: [{ field: "code", dir: "asc" }],
    take: 10,
    skip: 0,
};

const GridExcelExport = () => {
    const _export = React.useRef<ExcelExport | null>(null);
    const _grid = React.useRef<any>();
    const [page, setPage] = React.useState<PageInterface>({ skip: 0, take: 10 });

    
    // const _export = React.useRef<ExcelExport | null>(null);
    const excelExport = () => {
        if(_export.current !== null){
          _export.current.save();
        }
    }
   

    return (
        <>
        
        <h1> Kendo UI Grid with Excel export(specific records)</h1>
        
      <div>
        <ExcelExport
          data={data}
          ref={_export}
            >
          <ExcelExportColumn field="ProductID" title="Product ID" locked={true} width={50} />
          <ExcelExportColumn field="ProductName" title="Product Name" width={350} />
          <ExcelExportColumnGroup title="Availability" headerCellOptions={{ textAlign: 'center' }}>
            <ExcelExportColumn
              field="UnitPrice"
              title="Price"
              cellOptions={{ format: '$#,##0.00' }}
              width={150}
              footerCellOptions={{ wrap: true, textAlign: 'center' }}
              groupFooterCellOptions={{ textAlign: 'right' }}
                    />
            <ExcelExportColumn field="UnitsOnOrder" title="Units on Order" />
            <ExcelExportColumn field="UnitsInStock" title="Units in Stock" />
          </ExcelExportColumnGroup>
        </ExcelExport>
        <Grid
         pageable={true}
          style={{ height: '420px' }}

          data={products.slice(page.skip, page.skip + page.take)}
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
          <GridColumn field="ProductID" title="ID" width="50px" />
          <GridColumn field="ProductName" title="Name" />
          <GridColumn field="UnitPrice" title="Price" />
          <GridColumn field="UnitsInStock" title="In stock" />
          <GridColumn field="Discontinued" title="Discontinued" />
        </Grid>
      </div>
      </> );
}

export default GridExcelExport;