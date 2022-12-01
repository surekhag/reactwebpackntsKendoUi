import React, { useState } from "react";
import ProductDetailsPdfExports from "./ProductDetailsPdfExports"
import ProductDetailsExcelExports from "./ProductDetailsExcelExports"
import GridFilterExcelExport from "./GridFilterExcelExport"
import SharedButtons from "../SharedComps/SharedButtons"
import ProductColumnExpand from "./ProductColumnExpand";
const Products = () => {
    const [isDisplayed, setIsDisplayed] = useState(false);


    const HandleShowClick = () => {
        setIsDisplayed(true);
    }
    const HandleHideClick = () => {
        setIsDisplayed(false);
    }

    return (<>
        <h3> Products information | Grid | Pagination | Filter | Exports</h3>
        <SharedButtons
            isDisplayed={isDisplayed}
            HandleShowClick={HandleShowClick}
            HandleHideClick={HandleHideClick}
            title1={"Show Products Grid"}
            title2={"Hide Products Grid"}
        />
        {isDisplayed && <>
            <ProductColumnExpand />
            <ProductDetailsPdfExports />
            <ProductDetailsExcelExports />
            <GridFilterExcelExport />
        </>}
    </>)
}
export default Products;