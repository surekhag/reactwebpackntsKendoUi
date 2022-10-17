import React from 'react'
import employeeData from "../Configs/EmpData.json"
const styles = require("../Styles/EmployeeDetails.css");

const EmployeeDetails = (): JSX.Element => {
    const { empInfo } = employeeData;

    return <div>
        <h1>Employee Details</h1>
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

        })}
    </div>
}

export default EmployeeDetails;