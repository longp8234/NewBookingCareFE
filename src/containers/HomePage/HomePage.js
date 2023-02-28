import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderPage from './HeaderPage';
import Specialist from './Section/Specialist';
import MedicalFacility from './Section/MedicalFacility';
import OutstandingDoctor from './Section/OutstandingDoctor';
import Handbook from './Section/Handbook';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import './HomePage.scss';

class HomePage extends Component {
    handleAfterChange = () => {

    }

    render() { 
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            afterChange: this.handleAfterChange,
        };

        return (
            <div>
                <HeaderPage
                    isShowBanner={true}
                />
                <Specialist 
                    settings={settings} 
                />
                <MedicalFacility 
                    settings={settings} 
                />
                <OutstandingDoctor
                    settings={settings} 
                />
                <Handbook
                    settings={settings} 
                />
                <About />
                <HomeFooter />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
