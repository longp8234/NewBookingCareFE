import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';
import { getAllSpecialist } from '../../../services/userService';
import LoadingOverlay from 'react-loading-overlay';


class OutstandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: [],
            isShowLoading: false,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                isShowLoading: false,
            })
            this.setState({
                arrDoctors: this.props.topDoctorRedux
            })
        }
    }

    async componentDidMount() {
        this.props.loadTopDoctors();
        this.setState({
            isShowLoading: true,
        })
    }

    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }

    render() {
        let arrDoctors = this.state.arrDoctors;
        let {language} = this.props;
        return (
            <div className='section section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='section-header-name'><FormattedMessage id="homepage.oustanding-doctor" /></span>
                        <button className='section-header-btn'><FormattedMessage id="homepage.more" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item, index) => {
                                let imageBase64 = '';
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                }
                                let nameVi = `${item.positionData.valueVi} ${item.firstName} ${item.lastName}`
                                let nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`
                                return (
                                    <div className='section-item section-outstanding-doctor' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                        <div className='about-doctor'>
                                            <div className='doctor-image'>
                                                <div className='section-image section-outstanding-doctor'
                                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                                >
                                                </div>
                                            </div>
                                            <div className='doctor-infor text-center'>
                                                <div className='section-name doctor-name'>
                                                    {language === LANGUAGES.EN ? nameEn : nameVi}
                                                </div>
                                                <div className='section-name doctor-specialist'>Bác sĩ nổi bật của BookingCare</div>
                                            </div>
                                        </div>
                                    </div>            
                                )
                            })}
                        </Slider>
                        <LoadingOverlay
                            active={this.state.isShowLoading}
                            spinner
                            text='Loading...'
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorRedux: state.admin.topDoctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
