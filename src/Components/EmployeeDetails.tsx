import React, { useState } from 'react'
import employeeData from "../Configs/EmpData.json"
const styles = require("../Styles/EmployeeDetails.css");
import SharedButtons from "../SharedComps/SharedButtons"
import {
    Notification,
    NotificationGroup,
} from "@progress/kendo-react-notification";
import { Fade } from "@progress/kendo-react-animation";

interface State {
    success: boolean;
    info: boolean;
}

const EmployeeDetails = (): JSX.Element => {
    const [state, setState] = React.useState<State>({
        success: false,
        info: false,
    });

    const { empInfo } = employeeData;
    const [isDisplayed, setIsDisplayed] = useState(false);
    const isDisable = isDisplayed ? "" : "disabled";
    const { success, info } = state;
    const HandleShowClick = () => {
        setIsDisplayed(true);
        setState({
            success: true,
            info: false,
        })
    }
    const HandleHideClick = () => {
        setIsDisplayed(false);
        setState({
            success: false,
            info: true,
        })
    }
    return <>
        <div>
            <h3 className='headtext'> KendoReact UI Component Implementations</h3>
            <h3>Employee Details</h3>
            <SharedButtons
                isDisplayed={isDisplayed}
                HandleShowClick={HandleShowClick}
                HandleHideClick={HandleHideClick}
                title1={"Show Employee Info"}
                title2={"Hide Employee Info"}
            />
            {isDisplayed && <>

                <div className="row">
                    <div className='heading'>
                        <span className='head'>Name</span>
                    </div>
                    <div className='heading'>
                        <span className='head'>Designation</span>
                    </div>
                    <div className='heading'>
                        <span className='head'>Location</span>
                    </div>
                </div>

                {empInfo && empInfo.map((item: object, key: number) => {
                    return <div className="row" key={key}>
                        <div className='headrow'>
                            <span> {item.name} </span>
                        </div>
                        <div className='headrow'>
                            <span>{item && item.designation} </span>
                        </div>
                        <div className='headrow'>
                            <span>{item && item.location} </span>
                        </div>
                    </div>

                })} </>
            }

            <NotificationGroup
                style={{
                    right: 0,
                    top: 0,
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
                <Fade>
                    {info && (
                        <Notification
                            type={{ style: "info", icon: true }}
                            closable={true}
                            onClose={() => setState({ ...state, info: false })}
                        >
                            <span>Employee Information is hidden!</span>
                        </Notification>
                    )}
                </Fade>

            </NotificationGroup>

        </div>
    </>
}

export default EmployeeDetails;