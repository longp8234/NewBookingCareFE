import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {

    render() {
        return (
            <div className='section-about'>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <div className='section-about-header'>Truyền thông nói về BookingCare</div>
                        <iframe width="80%" height="240"
                            src="https://www.youtube.com/embed/FyDQljKtWnI"
                            title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen>
                        </iframe>
                    </div>

                    <div className='content-right'>
                        <div className='section-about-header'>Tải ứng dụng BookingCare</div>
                        <div className='download-content'>
                            <div className='mobile-download'></div>
                            <div className='download-options'>
                                <a href="http://bookingcare.vn/app/android" target='_blank'><div className='download-ggplay'></div></a>
                                <a href='http://bookingcare.vn/app/ios' target='_blank'><div className='download-appstore'></div></a>
                                <div className='list-content'>
                                    <div className='content-item'><i class="fas fa-check content-item-icon"></i> Đặt khám nhanh hơn</div>
                                    <div className='content-item'><i class="fas fa-check content-item-icon"></i> Thông báo từ hệ thống</div>
                                    <div className='content-item'><i class="fas fa-check content-item-icon"></i> Nhận hướng dẫn đi khám</div>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div className='content-center'>
                        <div className='section-about-company'>
                            <div className='company-title'><b>Công ty Cổ phần Công nghệ BookingCare</b></div>
                            <div className='company-location'><b>Địa chỉ:</b> 28 Thành Thái, Cầu Giấy, Hà Nội</div>
                            <div className='company-title'><b>Hỗ trợ khách hàng:</b> support@bookingcare.vn</div>
                        </div>
                        <div className='list-options'>
                            <ul>
                                <li>Liên hệ hợp tác</li>
                                <li>Gói chuyển đổi số doanh nghiệp</li>
                                <li>Tuyển dụng</li>
                                <li>Câu hỏi thường gặp</li>
                                <li>Điều khoản sử dụng</li>
                                <li>Chính sách bảo mật</li>
                                <li>Chính sách hỗ trợ</li>
                                <li>Quy trình giải quyết khiếu nại</li>
                            </ul>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
