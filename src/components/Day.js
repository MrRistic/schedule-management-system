import React from 'react';

const Day = (props) => {
    // console.log(props)
    const employees = (props.MainData && props.MainData.Employees) ? props.MainData.Employees : [];
    const dateList = (props.MainData && props.MainData.dateList) ? props.MainData.dateList : [];
    const date = (dateList[0] && dateList[0].date) ? dateList[0].date : null;
    const hours = []
    for(let i=0; i<=24; i++) {
       hours.push(i)
    }

  return (

      <div className="container">
          <table className="table table-bordered">
            <thead>
                <tr>
                    <th>{date} </th>
                    {hours.map((index)=>{
                        return <th key={index}>{index}</th>
                    })}
                </tr>
            </thead>
              <tbody>
              {  employees.map((employee, employeeId) => {

                  return <tr>
                      <td key = {employeeId}>
                          <img width="30px" src={require("../../public/images/" + employee.avatar)} />
                          {employee.firstName} {employee.lastName}
                          <br />
                          <i>{employee.jobTitleName}</i>
                      </td>
                      {hours.map((index)=>{
                          if(employee.shift[0].timeStart <= index && employee.shift[0].timeEnd >= index)
                          {
                              return <td key={index}>{employee.shift[0].name}</td>
                          }
                          else return <td key={index}>-</td>

                      })}
                  </tr>
              })}
              </tbody>

          </table>
      </div>
  )
};

export default Day;