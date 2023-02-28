import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import DatePicker from '../../../../components/Input/DatePicker';
import IntroductionDoctor from '../IntroductionDoctor';
import { postPatientBookingAppointment } from '../../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { toast } from "react-toastify";
import moment from 'moment';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            birthday: '',
            selectedGender: '',
            reason: '',
            doctorId: '',

            genders: '',
            timeType: '',            
        }
    }

    async componentDidMount() {
        this.props.getGenders();
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;

        if (data && data.length > 0) {
            data.map((item) => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }

        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            })
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType,
                })
            }
        }
    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy,
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0],
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption,
        })
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            return `${time}, ${date}`;
        }
        return '';
    } 

    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}` :
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`

            return name;
        }
        return '';
    }

    handleConfirmBooking = async () => {
        //validate input
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime)

        let res = await postPatientBookingAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            date: this.props.dataTime.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            reason: this.state.reason,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
        })

        if (res && res.errCode === 0) {
            toast.success("Bạn đã đặt lịch khám thành công!")
            this.props.closeModalBooking()
        } else {
            toast.error("Đặt lịch khám thất bại!")
        }
    }

    render() {
        let { isOpenModal, closeModalBooking, dataTime } = this.props;
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
        }
        console.log('check datat time: ', dataTime);
        
        return (
            <div>
                <Modal
                    isOpen={isOpenModal}
                    className={'booking-modal-container'}
                    size={'lg'}
                    centered
                >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='header-left'><FormattedMessage id={"patient.booking-modal.title"} /></span>
                            <span className='header-close' onClick={closeModalBooking}>
                                <i class="fas fa-times"></i>
                            </span>
                        </div>
                        <div className='booking-modal-body'>
                            <div className='doctor-infor'>
                                <IntroductionDoctor
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataTime={dataTime}
                                    isShowLinkDetail={false}
                                    isShowPrice={true} 
                                />
                            </div>
                            <div className='patient-infor'>
                                <div className='row'>
                                    <div className='col-6 form-group mt-3'>
                                        <label><FormattedMessage id={"patient.booking-modal.fullname"} /></label>
                                        <input type='text' className='form-control'
                                            value={this.state.fullName} onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                        />
                                    </div>
                                    <div className='col-6 form-group mt-3'>
                                        <label><FormattedMessage id={"patient.booking-modal.phonenumber"} /></label>
                                        <input type='text' className='form-control'
                                            value={this.state.phoneNumber} onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                        />
                                    </div>
                                    <div className='col-6 form-group mt-3'>
                                        <label><FormattedMessage id={"patient.booking-modal.email"} /></label>
                                        <input type='text' className='form-control'
                                            value={this.state.email} onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                        />
                                    </div>
                                    <div className='col-6 form-group mt-3'>
                                        <label><FormattedMessage id={"patient.booking-modal.address"} /></label>
                                        <input type='text' className='form-control'
                                            value={this.state.address} onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                        />
                                    </div>
                                    <div className='col-6 form-group mt-3'>
                                        <label><FormattedMessage id={"patient.booking-modal.birthday"} /></label>
                                        <DatePicker
                                            onChange={this.handleOnChangeDatePicker}
                                            className='form-control'
                                            value={this.state.birthday}
                                        />
                                    </div>
                                    <div className='col-6 form-group mt-3'>
                                        <label><FormattedMessage id={"patient.booking-modal.gender"} /></label>
                                        <Select
                                            value={this.state.selectedGender}
                                            onChange={this.handleChangeSelect}
                                            options={this.state.genders}
                                        />
                                    </div>
                                    <div className='col-12 form-group mt-3'>
                                        <label><FormattedMessage id={"patient.booking-modal.reason"} /></label>
                                        <input type='text' className='form-control'
                                            value={this.state.reason} onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button className='btn btn-primary btn-confirm-booking' onClick={() => this.handleConfirmBooking()}>
                                <FormattedMessage id={"patient.booking-modal.confirm"} />
                            </button>
                            <button className='btn btn-secondary btn-cancel-booking' onClick={closeModalBooking}>
                                <FormattedMessage id={"patient.booking-modal.cancel"} />
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
