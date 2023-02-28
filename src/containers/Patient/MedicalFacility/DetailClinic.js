import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './DetailClinic.scss';
import HeaderPage from '../../HomePage/HeaderPage';
import HomeFooter from '../../HomePage/HomeFooter';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorInforExamination from '../Doctor/DoctorInforExamination';
import IntroductionDoctor from '../Doctor/IntroductionDoctor';
import { getAllDetailClinicById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
import About from '../../HomePage/Section/About';


class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id

            let res = await getAllDetailClinicById({
                id: id,
            })

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic;  
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (this.props.listUsers !== prevProps.listUsers) {

        // }
    }

    render() {
        let { arrDoctorId, dataDetailClinic } = this.state;   
        let {language} = this.props;
        console.log('detail specialty check state: ', this.state);

        return (
            <>
                <HeaderPage />
                <div className='detail-specialty-container'>
                    <div className='detail-specialty-content'>
                        <div className='detail-specialty-introduction'>
                            {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                                <>
                                    <div className='detail-clinic-name'>{dataDetailClinic.name}</div>
                                    <div className='detail-clinic-content' dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}>
                                    </div>
                                </>
                            }
                        </div>

                        <div className='list-doctor-information'>
                            <div className='list-doctor-title'>Danh sách bác sĩ</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
