import React from 'react'
import employeeData from "../Configs/EmpData.json"
// const  styles =  require("../Styles/EmployeeDetails.css");

const EmployeeDetails = (): JSX.Element => {
    // console.log("employeeData test", employeeData.employeeData)
    const { empInfo } = employeeData;
    return <div>
        <p>Employee Details</p>
        {empInfo && empInfo.map((item: object) => {
            console.log("item", item)
            // const 
            return <div>
                <p>
                    <span>Name :</span> <span></span> { item.name}
                    <span className={"styles.desn"}>Designation :</span>{item && item.designation}
                </p>
            </div>

        })}
    </div>
}

export default EmployeeDetails;