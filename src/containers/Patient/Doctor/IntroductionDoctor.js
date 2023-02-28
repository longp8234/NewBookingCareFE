import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import './IntroductionDoctor.scss';
import { getIntroductionDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class IntroductionDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataIntroduction: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({
            dataIntroduction: data,
        })
    }

    getInforDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getIntroductionDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if (this.props.listUsers !== prevProps.listUsers) {

        // }

        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getInforDoctor(this.props.doctorId);
            this.setState({
                dataIntroduction: data,
            });
        }
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            return (
                <>
                    <div>{time}, {date}</div>
                    <div><FormattedMessage id={"patient.introduction-doctor.free-booking"} /></div>
                </>
            )
        }
        return '';
    }

    render() {
        let { dataIntroduction } = this.state;
        let { language, isShowDescriptionDoctor, dataTime, isShowLinkDetail, isShowPrice, doctorId } = this.props;

        let nameVi = '';
        let nameEn = '';
        if (dataIntroduction && dataIntroduction.positionData) {
            nameVi = `${dataIntroduction.positionData.valueVi} ${dataIntroduction.firstName} ${dataIntroduction.lastName}`
            nameEn = `${dataIntroduction.positionData.valueEn} ${dataIntroduction.firstName} ${dataIntroduction.lastName}`
        }

        console.log('introduc check props: ', this.props);
        return (
            <div className='introduce-doctor-container'>
                <div className='introduce-doctor'>
                    <div
                        className='introduce-left'
                        style={{ backgroundImage: `url(${dataIntroduction && dataIntroduction.image ? dataIntroduction.image : ''})` }}
                    >
                    </div>
                    <div className='introduce-right'>
                        <div className='doctor-title'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='doctor-position'>
                            {isShowDescriptionDoctor === true ? 
                                <>
                                    {dataIntroduction && dataIntroduction.Markdown && dataIntroduction.Markdown.description && 
                                        <span>{dataIntroduction.Markdown.description}</span>}
                                </> :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }
                        </div>
                        {isShowLinkDetail === true &&
                            <div className='view-detail-doctor'>
                                <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                            </div>
                        }
                    </div>
                </div>

                

                {isShowPrice === true &&
                    <div className='doctor-price'><FormattedMessage id={"patient.introduction-doctor.price"} />
                        {
                            dataIntroduction && dataIntroduction.Doctors_Infor && language === LANGUAGES.VI &&
                            <NumberFormat
                                value={dataIntroduction.Doctors_Infor.priceTypeData.valueVi}
                                suffix={'VND'}
                                displayType={'text'}
                                thousandSeparator={true}
                            />
                        }
                        {
                            dataIntroduction && dataIntroduction.Doctors_Infor && language === LANGUAGES.EN &&
                            <NumberFormat
                                value={dataIntroduction.Doctors_Infor.priceTypeData.valueEn}
                                suffix={'USD'}
                                displayType={'text'}
                                thousandSeparator={true}
                            />
                        }
                    </div>
                }
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(IntroductionDoctor);
