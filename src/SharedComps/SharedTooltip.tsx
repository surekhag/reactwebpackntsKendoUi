import React, { memo } from "react";
import { Tooltip } from '@progress/kendo-react-tooltip';

const SharedTooltip = (props: any) => {
    const { title } = props;
    return (<div style={{display: "inline-block", margin: "0 5px"}}>
        <Tooltip anchorElement="target" position="right" >
            <span className="k-icon k-i-information" title={title}></span>
        </Tooltip>
    </div>)
}
export default memo(SharedTooltip);
