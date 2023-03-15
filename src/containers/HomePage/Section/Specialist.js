import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from 'react-intl';
import { getAllSpecialist } from '../../../services/userService';
import { withRouter } from 'react-router';
import LoadingOverlay from 'react-loading-overlay';


class Specialist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSpecialist: [],
            isShowLoading: false,
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialist()
        this.setState({
            isShowLoading: true,
        })
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false,
            })
            this.setState({
                dataSpecialist: res.data ? res.data : []
            })
        }
    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }

    render() {

        let { dataSpecialist } = this.state;

        return (
            <>
                <div className='section section-specialist'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='section-header-name'><FormattedMessage id="homepage.popular-specialty" /></span>
                            <button className='section-header-btn'><FormattedMessage id="homepage.more" /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                {dataSpecialist && dataSpecialist.length > 0 && dataSpecialist.map((item, index) => {
                                    return (
                                        <div className='section-item'
                                            key={index}
                                            onClick={() => this.handleViewDetailSpecialty(item)}
                                        >
                                            <div className='section-image section-specialist'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            ></div>
                                            <div className='section-name'>{ item.name }</div>
                                        </div>
                                    )
                                }
                                )}
                            </Slider>
                            <LoadingOverlay
                                active={this.state.isShowLoading}
                                spinner
                                text='Loading...'
                            />
                        </div>
                    </div>
                    
                </div>
            </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialist));
