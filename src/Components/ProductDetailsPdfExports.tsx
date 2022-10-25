// ES2015 module syntax
import React from "react";
import {
    Grid,
    GridColumn,
    GridDataStateChangeEvent,
    GridToolbar,
    GridDetailRow,
    GridDetailRowProps,
    GridCellProps
} from "@progress/kendo-react-grid";
import products from "../Configs/Products.json";
import '@progress/kendo-theme-default/dist/all.css';
import { process, State } from "@progress/kendo-data-query";
import { GridPDFExport } from "@progress/kendo-react-pdf";
const styles = require("../Styles/Grid.css");

const initialDataState: State = {
    sort: [{ field: "code", dir: "asc" }],
    take: 10,
    skip: 0,
};
const ProductDetailsPdfExports = (): JSX.Element => {
    let gridPDFExport: GridPDFExport | null;
    const exportPDF = () => {
        if (gridPDFExport !== null) {
            gridPDFExport.save();
        }
    };
   
    const CommandCell = (props: GridCellProps) => {
        const dataItem = props.dataItem && props.dataItem.Image;
        return ( <td className="k-command-cell"><img src={dataItem} width ="25px" height="25px" 
        className="avatar"/></td>)
    }

    const [dataState, setDataState] = React.useState<State>(initialDataState);
    const GridComp =
         <Grid
         id="prods"
            pageable={true}
            style={{
                height: "400px",
            }}
            data={process(products, dataState)}
            {...dataState}
            onDataStateChange={(e: GridDataStateChangeEvent) => {
                setDataState(e.dataState);
            }}
            
        >
            <GridToolbar>
                <button
                    title="Export PDF"
                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                    onClick={exportPDF}
                >
                    Export PDF
                </button>
            </GridToolbar>
            {/* <GridColumn field="Image" title={title} width="100px" /> */}
            <GridColumn field="ProductID" title="ID" width="40px" />
            <GridColumn field="ProductName" title="Name" width="250px" />
            <GridColumn field="Category.CategoryName" title="CategoryName" />
            <GridColumn field="UnitPrice" title="Price" />
            <GridColumn field="UnitsInStock" title="In stock" />
            <GridColumn field= "" cell ={CommandCell} title="Avatar"/>
        </Grid>

    
    return (<>
        <h3>Grid with PDF export</h3>
        {GridComp }
        <GridPDFExport ref={(pdfExport) => (gridPDFExport = pdfExport)}>
            {GridComp }
        </GridPDFExport>
    </>);
}
export default ProductDetailsPdfExports;