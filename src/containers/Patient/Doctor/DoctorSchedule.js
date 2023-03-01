import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDate } from '../../../services/userService';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language)

        if (this.props.doctorIdFromParent) {
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
        this.setState({
            allDays: allDays,
        })
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++){
            let object = [];
            if (language === LANGUAGES.VI) {
                let labelVi = moment(new Date()).add(i+1, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(labelVi);
            }
            if(language === LANGUAGES.EN){
                object.label = moment(new Date()).add(i+1, 'days').locale('en').format('dddd - DD/MM');
            }
            
            object.value = moment(new Date()).add(i+1, 'days').startOf('day').valueOf();
            allDays.push(object)
        }

        return allDays;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language)
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language)
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date)

            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
        }
    }

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time,
        })
        console.log('check time: ', time);
    }

    closeModalBooking = () => {
        this.setState({
            isOpenModalBooking: false,
        })
    }

    render() {
        let { allDays, allAvailableTime, isOpenModalBooking, dataScheduleTimeModal } = this.state;
        let { language } = this.props;

        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='doctor-schedule-content'>
                        <div className='choose-date'>
                            <div className='text-calendar'>
                                <span><i class="far fa-calendar-alt"></i> <FormattedMessage id={"patient.detail-doctor.schedule"} /></span>
                            </div>
                            <select onChange={(event) => this.handleOnChangeSelect(event)}>
                                {allDays && allDays.length > 0 && allDays.map((item, index) => {
                                    return (
                                        <option key={index} value={item.value}>{ item.label }</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='available-time'>
                            <div className='working-time'>
                                {
                                    allAvailableTime && allAvailableTime.length > 0 ?
                                        allAvailableTime.map((item, index) => {
                                            let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                            return (
                                                <button className='working-time-btn' key={index} onClick={() => this.handleClickScheduleTime(item)}>
                                                    {timeDisplay}
                                                </button>
                                            )    
                                        }) : <div><FormattedMessage id={"patient.detail-doctor.no-schedule"} /></div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeModalBooking={this.closeModalBooking}
                    dataTime={dataScheduleTimeModal}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
