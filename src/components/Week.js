import React from 'react';
import {Link} from 'react-router'
import PropTypes from 'prop-types';

const Week = (props) => {
    // console.log(props)
    const employees = (props.MainData && props.MainData.Employees) ? props.MainData.Employees : [];
    const dateList = (props.MainData && props.MainData.dateList) ? props.MainData.dateList : [];

    return(

        <div className="container">


            <table className="table table-bordered">
                <thead>
                <tr>
                    <th> {props.MainData.entireWeek} </th>
                    {dateList.map((item,index) => {
                        let activeClass = (item.current) ? 'active' : '';
                        let currDate = new Date(item.date);
                        return  <th className={activeClass} key={index}><Link to={"/day/" + currDate.getMonth() + "/" + currDate.getDate()  }>
                            {item.date} </Link></th>
                    })}
                </tr>
                </thead>
                <tbody>
                {  employees.map((employee, employeeId) => {

                    return <tr>
                        <td key = {employeeId} onClick={() => {props.children.onClickfilterBy(employee)}}>
                            <img width="30px" src={require("../../public/images/" + employee.avatar)} />
                            {employee.firstName} {employee.lastName}
                            <br />
                            <i>{employee.jobTitleName}</i>
                        </td>
                        {(employee.shift) && employee.shift.map((item,index) => {
                            let activeClass = (dateList[index].current) ? 'active' : '';
                            return  <td className={activeClass} key={index}>
                                {item.name}
                                <br/>
                                {item.timeStart} - {item.timeEnd}
                            </td>
                        })}
                    </tr>
                })}

                </tbody>
            </table>
        </div>
    )
};

export default Week;

Week.propType = {
    onClickfilterBy: PropTypes.func.isRequired
};