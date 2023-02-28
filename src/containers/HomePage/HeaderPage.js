import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './HeaderPage.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router';

class HeaderPage extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    render() { 
        let language = this.props.language
        console.log('check user info: ', this.props.userInfo);

        return (
            <React.Fragment>
                <div className='header-page-container'>
                    <div className='header-page-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars menu-header-icon"></i>
                            <div className='header-logo' onClick={() => this.returnToHome()}></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-center-content'>
                                <div className='child-title'><FormattedMessage id={"header-page.specialty"} /></div>
                                <div className='child-description'><FormattedMessage id={"header-page.find-a-doctor-by-specialty"} /></div>
                            </div>
                            <div className='child-center-content'>
                                <div className='child-title'><FormattedMessage id={"header-page.health-facilities"} /></div>
                                <div className='child-description'><FormattedMessage id={"header-page.choose-hospital"} /></div>
                            </div>
                            <div className='child-center-content'>
                                <div className='child-title'><FormattedMessage id={"header-page.doctor"} /></div>
                                <div className='child-description'><FormattedMessage id={"header-page.choose-doctor"} /></div>
                            </div>
                            <div className='child-center-content'>
                                <div className='child-title'><FormattedMessage id={"header-page.checkup-package"} /></div>
                                <div className='child-description'><FormattedMessage id={"header-page.general-health-check"} /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support-icon'>
                                <i className="fas fa-question-circle"></i> <FormattedMessage id={"header-page.support"} />
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-header-vi active' : 'language-header-vi'}>
                                <i class="fab fa-vimeo"></i><span onClick={() => {this.changeLanguage(LANGUAGES.VI)}}> Tiếng Việt</span>
                            </div>
                            <div className={language === LANGUAGES.EN ? 'language-header-en active' : 'language-header-en'}>
                                <i class="fab fa-etsy"></i><span onClick={() => {this.changeLanguage(LANGUAGES.EN)}}> English</span>
                            </div>
                        </div>
                    </div>
                </div>

                {this.props.isShowBanner === true &&
                    <div className='home-banner'>
                        <div className='banner-content-above'>
                            <div className='banner-title'><FormattedMessage id={"home-banner.MEDICAL-BACKGROUND"} /></div>
                            <div className='banner-slogan'><FormattedMessage id={"home-banner.COMPREHENSIVE-HEALTH-CARE"} /></div>
                            <div className='banner-search'>
                                <i class="fas fa-search"></i>
                                <input type='text' placeholder='Tìm kiếm...'/>
                            </div>
                        </div>
                        <div className='banner-content-below'>
                            <div className='banner-list'>
                                <div className='list-item'>
                                    <div className='item-logo'>
                                        <i class="fas fa-hospital"></i>
                                    </div>
                                    <div className='item-name specialist'><FormattedMessage id={"home-banner.Specialist examination"} /></div>
                                </div>
                                <div className='list-item'>
                                    <div className='item-logo'>
                                        <i class="fas fa-address-card"></i>
                                    </div>
                                    <div className='item-name'><FormattedMessage id={"home-banner.General examination"} /></div>
                                </div>
                                <div className='list-item'>
                                    <div className='item-logo'>
                                        <i class="fas fa-flask"></i>
                                    </div>
                                    <div className='item-name'><FormattedMessage id={"home-banner.Medical test"} /></div>
                                </div>
                                <div className='list-item'>
                                    <div className='item-logo'>
                                        <i class="fas fa-procedures"></i>
                                    </div>
                                    <div className='item-name'><FormattedMessage id={"home-banner.Mental health"} /></div>
                                </div>
                                <div className='list-item'>
                                    <div className='item-logo'>
                                        <i class="fas fa-user-md"></i>
                                    </div>
                                    <div className='item-name'><FormattedMessage id={"home-banner.Dental examination"} /></div>
                                </div>
                                <div className='list-item'>
                                    <div className='item-logo'>
                                        <i class="fas fa-notes-medical"></i>
                                    </div>
                                    <div className='item-name'><FormattedMessage id={"home-banner.Surgery Package"} /></div>
                                </div>
                                <div className='list-item'>
                                    <div className='item-logo'>
                                        <i class="fas fa-first-aid"></i>
                                    </div>
                                    <div className='item-name'><FormattedMessage id={"home-banner.Medical products"} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderPage));
