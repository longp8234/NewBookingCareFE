import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';
import LoadingOverlay from 'react-loading-overlay';


class MedicalFacility extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataClinics: [],
            isShowLoading: false,
        }
    }

    async componentDidMount() {
        let res = await getAllClinic();
        this.setState({
            isShowLoading: true,
        })
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false,
            })
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }
    }

    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }

    render() {
        let { dataClinics } = this.state;
        return (
            <div className='section section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='section-header-name'><FormattedMessage id="homepage.oustanding-facility" /></span>
                        <button className='section-header-btn'><FormattedMessage id="homepage.more" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataClinics && dataClinics.length > 0 && dataClinics.map((item, index) => {
                                return (
                                    <div className='section-item'
                                        key={index}
                                        onClick={() => this.handleViewDetailClinic(item)}
                                    >
                                        <div className='section-image section-medical-facility'
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        ></div>
                                        <div className='section-name'>{ item.name }</div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
