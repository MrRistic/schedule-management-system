import React from 'react';
import PropTypes from 'prop-types';

const Navigate = (props) => {

    const navigator =(props.dataSet.MainData.dateList) ? {
        index:  (props.dataSet.params.day) ? 'Day' : 'Week',
        data: (props.dataSet.params.day) ? props.dataSet.MainData.dateList[0].date : props.dataSet.MainData.weekNo
    } : null;
     return (navigator !== null) && (
        <h2>
            <span className="glyphicon glyphicon-chevron-left" onClick={() => {props.onClickPrevNext('prev')}} />
            {navigator.index} {navigator.data}
            <span className="glyphicon glyphicon-chevron-right" onClick={() => {props.onClickPrevNext('next')}} />
        </h2>
    )
};

export default Navigate

Navigate.propType = {
    onClickPrevNext: PropTypes.func.isRequired
};