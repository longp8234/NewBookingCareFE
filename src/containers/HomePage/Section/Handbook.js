import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Handbook extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2
        };
        return (
            <div className='section section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='section-header-name'><FormattedMessage id="homepage.outstanding-handbook" /></span>
                        <button className='section-header-btn'><FormattedMessage id="homepage.more" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            <div className='section-item'>
                                <div className='section-image section-handbook'></div>
                            </div>
                            <div className='section-item'>
                                <div className='section-name section-handbook'>Trị mụn chuẩn y khoa giá ưu đãi tại Phòng khám Da liễu Hà Nội</div>
                            </div>
                            <div className='section-item'>
                                <div className='section-image section-handbook'></div>
                            </div>
                            <div className='section-item'>
                                <div className='section-name section-handbook'>Trị mụn chuẩn y khoa giá ưu đãi tại Phòng khám Da liễu Hà Nội</div>
                            </div>
                            <div className='section-item'>
                                <div className='section-image section-handbook'></div>
                            </div>
                            <div className='section-item'>
                                <div className='section-name section-handbook'>Trị mụn chuẩn y khoa giá ưu đãi tại Phòng khám Da liễu Hà Nội</div>
                            </div>
                        </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
