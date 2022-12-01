// ES2015 module syntax
import React, { useRef } from "react";
import {
    Grid,
    GridColumn,
    GridDataStateChangeEvent,
    GridCellProps,
    GridHeaderCellProps,
    GridDetailRowProps,
    GridExpandChangeEvent
} from "@progress/kendo-react-grid";
import products from "../Configs/ProductDemo.json";
// import '@progress/kendo-theme-default/dist/all.css';
import { process, State } from "@progress/kendo-data-query";
import SharedTooltip from "../SharedComps/SharedTooltip";
// const styles = require("../Styles/Grid.css");

const initialDataState: State = {
    sort: [{ field: "code", dir: "asc" }],
    take: 10,
    skip: 0,
};

// expanded grid

const DetailComponent = (props: GridDetailRowProps) => {
    const data = props.dataItem.details;
    if (data) {
      return (
        <Grid data={data}>
          <GridColumn field="ProductID" title="Product ID" width="120px" />
          <GridColumn field="ProductName" title="Product Name" />
          <GridColumn field="UnitPrice" title="Unit Price" format="{0:c}" />
        </Grid>
      );
    }
    return (
      <div style={{ height: "50px", width: "100%" }}>
        <div style={{ position: "absolute", width: "100%" }}>
          <div className="k-loading-image" />
        </div>
      </div>
    );
  };

const ProductColumnExpand = (): JSX.Element => {

    const expandChange = (event: GridExpandChangeEvent) => {
        event.dataItem.expanded = event.value;
        setProductsData([...productList]);
    }
    const ImageCell = (props: GridCellProps) => {
        const dataItem = props.dataItem && props.dataItem.Image;
        return ( <td className="k-command-cell"><img src={dataItem} width ="25px" height="25px" 
        className="avatar"/></td>)
    }
    // Category with tooltip
    const CategoryCell = (props: GridCellProps) => {
        const {Category} = props.dataItem;
        return ( Category &&
            <td className="k-command-cell">{Category.CategoryName} 
                <SharedTooltip title={Category.Description}></SharedTooltip>
            </td>
        )
    }

    const LinkCell = (props: GridCellProps) => {
        const dataItem = props.dataItem && props.dataItem.Image;
        return ( <td className="k-command-cell"><a href={dataItem} target= "_blank"
        className="avatarLink">Avatar</a></td>)
    }

    // state for column expande/collapse
    const [isVisible, setColumnState] = React.useState<boolean>(false);

    // Header cell customization
    const CustomHeaderCell = (props: GridHeaderCellProps) => {
        return <> {props.title || props.field + ' '}
        <span onClick={() => setColumnState(!isVisible)} style={{float: "right", cursor: "pointer"}}>
            {isVisible ? <span className="k-icon k-i-minus"></span> : <span className="k-icon k-i-plus"></span>}
        </span></>
    }

    const [dataState, setDataState] = React.useState<State>(initialDataState);
    const [productList, setProductsData] = React.useState<any>(products);
    const GridComp =
         <Grid pageable={true}
            style={{
                height: "400px",
            }}
            data={process(productList, dataState)}
            onDataStateChange={(e: GridDataStateChangeEvent) => {
                setDataState(e.dataState);
            }}
            detail={DetailComponent}
            expandField="expanded"
            onExpandChange={expandChange}
            
        >
            {/* <GridColumn field="Image" title={title} width="100px" /> */}
            <GridColumn field="ProductID" title="ID" width="60px" locked={true} />
            <GridColumn field="ProductName" title="Name" width="250px" locked={true} />
            <GridColumn field="CategoryName" cell={CategoryCell} title="CategoryName" headerCell={CustomHeaderCell} width="250px" />
            {
                isVisible && [
                    <GridColumn field="UnitPrice" title="Price" width="250px" />,
                    <GridColumn field="UnitsInStock" title="In stock" width="250px" />
                ]
            }
            <GridColumn field= "" cell ={ImageCell} title="Avatar" width="250px"/>
            <GridColumn field= "" cell ={LinkCell} title="Link" width="250px"/>
            <GridColumn field= "" cell ={ImageCell} title="Avatar" width="250px"/>
            <GridColumn field= "" cell ={LinkCell} title="Link" width="250px"/>
            <GridColumn field= "" cell ={ImageCell} title="Avatar" width="250px"/>
            <GridColumn field= "" cell ={LinkCell} title="Link" width="250px"/>
            <GridColumn field= "" cell ={ImageCell} title="Avatar" width="250px"/>
            
        </Grid>

    
    return (<>
        <h3>Grid with Column Expand/Collapse and Tooltip</h3>
        {GridComp }
    </>);
}
export default ProductColumnExpand;