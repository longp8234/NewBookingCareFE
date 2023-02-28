import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorInforExamination.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getDoctorInforExaminationById } from '../../../services/userService';
import NumberFormat from 'react-number-format';

class DoctorInforExamination extends Component {
    constructor(props) {
        super(props)
        this.state = {
            examinationInfor: {},
        }
    }

    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let res = await getDoctorInforExaminationById(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    examinationInfor: res.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getDoctorInforExaminationById(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    examinationInfor: res.data
                })
            }
        }
    }

    render() {
        let { language } = this.props;
        let { examinationInfor } = this.state;

        return (
            <>
                <div className='doctor-infor-examination-container'>
                    <div className='doctor-infor-examination-content'>
                        <div className='medical-facility-infor'>
                            <div className='medical-facility-title'><i class="fas fa-map-marker-alt"></i>
                                <FormattedMessage id={"patient.doctor-infor-examination.address"} />
                            </div>
                            <div className='medical-facility-name'>
                                {examinationInfor && examinationInfor.nameClinic ? examinationInfor.nameClinic : ''}
                            </div>
                            <div className='medical-facility-address'>
                                {examinationInfor && examinationInfor.addressClinic ? examinationInfor.addressClinic : ''}
                            </div>
                        </div>
                        <div className='doctor-infor-examination'>
                            <div className='infor-examination-title'><FormattedMessage id={"patient.doctor-infor-examination.price"} /></div>
                            <div className='infor-examination-price'>
                                {examinationInfor && examinationInfor.priceTypeData && language === LANGUAGES.VI && 
                                    <NumberFormat
                                        value={examinationInfor.priceTypeData.valueVi}
                                        suffix={'VND'}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                    />
                                }
                                {examinationInfor && examinationInfor.priceTypeData && language === LANGUAGES.EN && 
                                    <NumberFormat
                                        value={examinationInfor.priceTypeData.valueEn}
                                        suffix={'USD'}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                    />
                                }
                            </div>
                        </div>
                        <div className='payment'>
                            <FormattedMessage id={"patient.doctor-infor-examination.payments"} />
                            {examinationInfor && examinationInfor.paymentTypeData && language === LANGUAGES.VI ? examinationInfor.paymentTypeData.valueVi : ''}
                            {examinationInfor && examinationInfor.paymentTypeData && language === LANGUAGES.EN ? examinationInfor.paymentTypeData.valueEn : ''}
                        </div>
                        <div className='infor-examination-warning'>(<FormattedMessage id={"patient.doctor-infor-examination.note"} />)</div>
                    </div>
                </div>
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

    export default connect(mapStateToProps, mapDispatchToProps)(DoctorInforExamination);
