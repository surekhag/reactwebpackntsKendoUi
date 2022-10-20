import React, { memo } from "react";
import { Button } from "@progress/kendo-react-buttons";

const SharedButtons = (props: any) => {
    const { isDisplayed, HandleShowClick, HandleHideClick, title1, title2 } = props;
    return (<>
        <Button disabled={isDisplayed} onClick={HandleShowClick}>{title1}</Button>
        <Button disabled={!isDisplayed} onClick={HandleHideClick}>{title2}</Button>
    </>)
}
export default memo(SharedButtons);
