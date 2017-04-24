import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { receiveEmployeesList, filterEmployees } from '../actions/Actions';
import Header from './common/Header'
import Navigate from './common/Navigate'


class MainContainer extends Component {
    constructor(){
        super();
        this.onClickPrevNext = this.onClickPrevNext.bind(this);
        this.onClickfilterBy = this.onClickfilterBy.bind(this);
    }

    onClickPrevNext(event){
        let number,path;
        if(this.props.params.day && this.props.params.month)
        {
             number = this.props.params.day;
             path = '/day/'+this.props.params.month+'/';
        }
        else {
             number = (this.props.params.Id && this.props.params.Id > 0 && this.props.params.Id < 53)
                ? this.props.params.Id
                : this.getWeekNumber(new Date()) + 1;
             path = '/week/';
        }
        let action = (event === 'prev') ? parseInt(number) - 1 : parseInt(number) + 1;

        this.props.router.push(path + action);



    }
    //Get dates for the current week
    getWeekData(weekNum = null)
    {
        //TODO make logic for more years then the current

        let weekNumber = (weekNum && weekNum >0 && weekNum < 53)
            ? weekNum
            : this.getWeekNumber(new Date())+1;


        const currentDate = new Date();

        let dateFromWeekNum = this.getDateOfWeek(weekNumber,currentDate.getFullYear());

        const firstDay = this.getFirstDate(dateFromWeekNum);

        let dateList = this.getDatesList(firstDay,currentDate);

        return {
            dateList ,
            weekNo: this.getWeekNumber(firstDay),
            entireWeek: this.parseDate(new Date(dateList[0].date+ ',' + dateList[0].year),false) + ' - ' + this.parseDate(new Date(dateList[6].date + ',' + dateList[6].year),false) + ', ' + dateList[0].year
        };

    };

    getWeekNumber(date){
        let firstDayYear = new Date(date.getFullYear(), 0, 1);

        return Math.ceil((((date - firstDayYear) / 86400000) + firstDayYear.getDay() +1  ) / 7)-1;
    }
    getDateOfWeek(w, y) {
        let d = (1 + (w - 1) * 7)+1; // 1st of January + 7 days for each week

        return new Date(y, 0, d);
    }
    //Get the date for the first day of the week
     getFirstDate(predefinedDate = new Date()){
        let date = predefinedDate;
        let day = date.getDay();
        let dayOffset = (day>0 ) ? day - 1 : 6;
        return new Date(date.setDate(date.getDate() - dayOffset))

    };
     //Loop trough days and set the dates to list
     getDatesList(date,currentDate) {
        const dateList = [];
        for(let i = 0; i < 7; i++)
        {
            dateList.push({
               date: this.parseDate(date),
               year: date.getFullYear(),
               current: (currentDate.getDate() === new Date(date).getDate())
            });
            date.setDate(date.getDate()+1)
        }
        return dateList;

    };
     parseDate(date, day = true)
     {
         let locale = 'en-us';
         let weekDay = date.toLocaleString(locale, { weekday:'short' });
         let month = date.toLocaleString(locale, { month:'short' });

         return (day)
             ? weekDay + ', ' + month + ' ' + date.getDate()
             : month + ' ' + date.getDate();

     }

    componentWillReceiveProps(newProps){
        if(newProps.params.Id !== this.props.params.Id)
        {
            this.state = this.getWeekData(newProps.params.Id);
            this.props.receiveEmployeesList(this.state);
        }

        if(newProps.params.day !== this.props.params.day)
        {
            this.state = this.getDay(newProps.params.day,newProps.params.month)
            this.props.receiveEmployeesList(this.state);
        }
        // if(this.props.location.action === 'PUSH' && this.props.location.pathname === '/' )
        // {
        //     this.state = this.getWeekData();
        //     this.props.receiveEmployeesList(this.state);
        // }
    }
    componentWillMount()
    {
        if(this.props.params.day && this.props.params.month)
        {
            this.state = this.getDay(this.props.params.day,this.props.params.month)
            // console.log(this.state)
        }
        if(this.props.params.Id)
        {
            this.state = this.getWeekData(this.props.params.Id);
        }
        if(this.props.location.pathname === '/') {

            this.state = this.getWeekData();
        }
        // console.log(this.state)
        this.props.receiveEmployeesList(this.state);

    }
    getDay(day,month)
    {
        let year = new Date().getFullYear();
        let newMonth = parseInt(month)+1;
        let newDate = new Date(year+'/'+newMonth+'/'+day);

        return {dateList: [{
                date: this.parseDate(newDate),
                year: year
            }]};


    }



    onClickfilterBy(obj){

        this.props.filterEmployees(obj);
        
    }

    render(){

                return(
                    <div>

                        <Header />
                        <Navigate dataSet={this.props} onClickPrevNext={this.onClickPrevNext}/>
                        {
                            React.cloneElement({...this.props}.children, {...this.props},{onClickfilterBy : this.onClickfilterBy} )
                        }
                    </div>
                )

    }
}

MainContainer.propTypes = {
    MainData: PropTypes.object.isRequired,
    receiveEmployeesList: PropTypes.func.isRequired,
    filterEmployees: PropTypes.func.isRequired,
    router:PropTypes.object.isRequired

};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({receiveEmployeesList, filterEmployees }),dispatch);
}
function mapStateToProps( { MainData } ) {
    return { MainData };
}


export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
