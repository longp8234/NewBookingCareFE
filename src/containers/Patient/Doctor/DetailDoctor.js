import React, { Component } from 'react';
import { connect } from "react-redux";
import HeaderPage from '../../HomePage/HeaderPage';
import HomeFooter from '../../HomePage/HomeFooter';
import About from '../../HomePage/Section/About';
import DoctorSchedule from './DoctorSchedule';
import DoctorInforExamination from './DoctorInforExamination';
import './DetailDoctor.scss';

import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';

class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            this.setState({
                currentDoctorId: id,
            })

            let res = await getDetailInforDoctor(id)
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    render() {
        console.log('check state: ', this.state);
        let {language} = this.props
        let { detailDoctor } = this.state;
        let nameVi = '';
        let nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi} ${detailDoctor.firstName} ${detailDoctor.lastName}`
            nameEn = `${detailDoctor.positionData.valueEn} ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }
        return (
            <>
                <HeaderPage
                    isShowBanner={false}
                />
                <div className='detail-doctor-container'>
                    <div className='introduce-doctor'>
                        <div
                            className='introduce-left'
                            style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}
                        >
                        </div>
                        <div className='introduce-right'>
                            <div className='doctor-title'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='doctor-position'>
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description && 
                                    <span>{detailDoctor.Markdown.description}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>
                        <div className='schedule-doctor-content'>
                            <div className='doctor-content-left'>
                                <DoctorSchedule
                                    doctorIdFromParent={this.state.currentDoctorId}
                                />
                            </div>
                            <div className='doctor-content-right'>
                                <DoctorInforExamination
                                    doctorIdFromParent={this.state.currentDoctorId}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='detail-infor-doctor'>
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML && 
                            <div  dangerouslySetInnerHTML={{__html: detailDoctor.Markdown.contentHTML}}>
                            </div>
                        }
                    </div>
                    <div className='review-doctor'></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
