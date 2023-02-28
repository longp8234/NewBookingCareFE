import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BillModal.scss';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from "react-toastify";
import moment from 'moment';
import { CommonUtils } from '../../../utils';


class BillModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: '',
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
               email: this.props.dataModal.email,
           })
       }
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            })
        }
    }

    handleChangeEmail = (event) => {
        this.setState({
            email: event.target.value,
        })
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64,
            })
        }
    }

    handleSendBill = () => {
        this.props.sendBill(this.state)
    }

    render() {
        let { isOpenModal, dataModal, closeModalBill, sendBill } = this.props;
        
        return (
            <Modal
                isOpen={isOpenModal}
                className={'bill-modal-container'}
                size="md"
                centered
            >
                <div className='bill-modal-content'>
                    <div className='modal-header'>
                        <span className='header-left'>Gửi hóa đơn xác nhận lịch khám</span>
                        <span className='header-close' onClick={closeModalBill}>
                            <i class="fas fa-times"></i>
                        </span>
                    </div>
                    <ModalBody>
                        <div className='patient-infor'>
                            <div className='row'>
                                <div className='col-6 form-group mt-3'>
                                    <label><FormattedMessage id={"patient.booking-modal.email"} /></label>
                                    <input type='email' className='form-control'
                                        value={this.state.email} onChange={(event) => this.handleChangeEmail(event)}
                                    />
                                </div>
                                <div className='col-6 form-group mt-3'>
                                    <label>Chọn file xác nhận</label>
                                    <input type='file' className='form-control' onChange={(event) => this.handleOnchangeImage(event)}
                                    />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-primary btn-confirm-booking' onClick={() => this.handleSendBill()}>
                            <FormattedMessage id={"patient.booking-modal.confirm"} />
                        </button>
                        <button className='btn btn-secondary btn-cancel-booking' onClick={closeModalBill}>
                            <FormattedMessage id={"patient.booking-modal.cancel"} />
                        </button>
                    </ModalFooter>
                </div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BillModal);
