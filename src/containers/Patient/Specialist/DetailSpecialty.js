import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './DetailSpecialty.scss';
import HeaderPage from '../../HomePage/HeaderPage';
import HomeFooter from '../../HomePage/HomeFooter';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorInforExamination from '../Doctor/DoctorInforExamination';
import IntroductionDoctor from '../Doctor/IntroductionDoctor';
import { getAllDetailSpecialistById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
import About from '../../HomePage/Section/About';


class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: [],
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id

            let res = await getAllDetailSpecialistById({
                id: id,
                location: 'ALL',
            })

            let resProvince = await getAllCodeService('PROVINCE')

            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data;
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;  
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                let dataProvince = resProvince.data
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueVi: 'Toàn quốc',
                        valueEn: 'Nationwide',
                    })
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : [],
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (this.props.listUsers !== prevProps.listUsers) {

        // }
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;

            let res = await getAllDetailSpecialistById({
                id: id,
                location: location,
            })

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;  
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;   
        let {language} = this.props;
        console.log('detail specialty check state: ', this.state);

        return (
            <>
                <HeaderPage />
                <div className='detail-specialty-container'>
                    <div className='detail-specialty-content'>
                        <div className='detail-specialty-introduction'>
                            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                                <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}>
                                </div>
                            }
                        </div>

                        <div className='list-doctor-information'>
                            <div className='search-doctor-province'>
                                <select onChange={(event) => this.handleOnChangeSelect(event)}>
                                    {listProvince && listProvince.length > 0 && listProvince.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            
                            {arrDoctorId && arrDoctorId.length && arrDoctorId.map((item, index) => {
                                return (
                                    <div className='doctor-information'>
                                        <div className='doctor-introduction'>
                                            <div className='profile-doctor'>
                                                <IntroductionDoctor
                                                    doctorId={item}
                                                    isShowDescriptionDoctor={true}
                                                    isShowLinkDetail={true}
                                                    isShowPrice={false} 
                                                    // dataTime={dataTime}
                                                />
                                            </div>
                                        </div>
                                        <div className='doctor-schedule'>
                                            <div className='schedule-block'>
                                                <DoctorSchedule
                                                    doctorIdFromParent={item}
                                                />
                                            </div>

                                            <div className='examination-block'>
                                                <DoctorInforExamination
                                                    doctorIdFromParent={item}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <About />
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
