import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './ManageDoctor.scss';
import { getDetailInforDoctor } from '../../../services/userService';
import Select from 'react-select';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '', 
            listDoctors: [],
            availableData: false,

            //save to more infor doctor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: '',
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.getAllRequiredDoctorInfor()
    }

    buildDataInputSelect = (inputData, type) => {
        let result = []
        let language = this.props.language
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.firstName} ${item.lastName}`
                    let labelEn = `${item.lastName} ${item.firstName}`
                    object.label = language === LANGUAGES.EN ? labelEn : labelVi
                    object.value = item.id
                    result.push(object)
                })
            }
            
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.valueVi}`
                    let labelEn = `${item.valueEn} USD`
                    object.label = language === LANGUAGES.EN ? labelEn : labelVi
                    object.value = item.keyMap
                    result.push(object)
                })
            }

            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.valueVi}`
                    let labelEn = `${item.valueEn}`
                    object.label = language === LANGUAGES.EN ? labelEn : labelVi
                    object.value = item.keyMap
                    result.push(object)
                })
            }

            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {}
                    object.label = item.name
                    object.value = item.id 
                    result.push(object)
                })
            }

            if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let object = {}
                    object.label = item.name
                    object.value = item.id
                    result.push(object)
                })
            }
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {

            let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY')
            let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC')

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,   
                listClinic: dataSelectClinic,   
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')

            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')

            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }
    } 

    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        let availableData = this.state.availableData;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: availableData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,

            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value,
        })
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let { listPrice, listPayment, listProvince, listSpecialty, listClinic } = this.state;

        let res = await getDetailInforDoctor(selectedOption.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;

            let addressClinic = '', nameClinic = '', note = '',
                priceId = '', paymentId = '', provinceId = '', specialtyId = '', clinicId = '',
                selectedPrice = '', selectedPayment = '', selectedProvince = '',
                selectedSpecialty = '', selectedClinic = '';
            
            if (res.data.Doctors_Infor) {
                nameClinic = res.data.Doctors_Infor.nameClinic;
                addressClinic = res.data.Doctors_Infor.addressClinic;
                note = res.data.Doctors_Infor.note;

                priceId = res.data.Doctors_Infor.priceId;
                paymentId = res.data.Doctors_Infor.paymentId;
                provinceId = res.data.Doctors_Infor.provinceId;

                specialtyId = res.data.Doctors_Infor.specialtyId;
                clinicId = res.data.Doctors_Infor.clinicId;

                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })

                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })

                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                availableData: true,
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note,

                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic,
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                availableData: false,
                nameClinic: '',
                addressClinic: '',
                note: '',
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: '',
            })
        }
    };

    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;

        this.setState({
            ...stateCopy
        })
    }

    render() {
        let { availableData } = this.state;

        return (
            <div className='manage-doctor-container'>
                <div className="manage-doctor-title">
                    <FormattedMessage id={"manage-doctor.title"} />
                </div>
                <div className='more-introduction'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id={"manage-doctor.choose-doctor"} /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id={"manage-doctor.choose-doctor"} />}
                        /> 
                    </div>
                    <div className='content-right form-group'>  
                        <label><FormattedMessage id={"manage-doctor.introduction"} /></label>
                        <textarea
                            className='form-control'
                            rows="4"
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>

                <div className='row more-details'>
                    <div className='col-4 form-group mt-4'>
                        <label><FormattedMessage id={"manage-doctor.price"} /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id={"manage-doctor.price"} />}
                            name="selectedPrice"
                        /> 
                    </div>
                    <div className='col-4 form-group mt-4'>
                        <label><FormattedMessage id={"manage-doctor.payment"} /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id={"manage-doctor.payment"} />}
                            name="selectedPayment"
                        /> 
                    </div>
                    <div className='col-4 form-group mt-4'>
                        <label><FormattedMessage id={"manage-doctor.province"} /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id={"manage-doctor.province"} />}
                            name="selectedProvince"
                        /> 
                    </div>
                    <div className='col-4 form-group mt-4'>
                        <label><FormattedMessage id={"manage-doctor.name-clinic"} /></label>
                        <input
                            className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className='col-4 form-group mt-4'>
                        <label><FormattedMessage id={"manage-doctor.address-clinic"} /></label>
                        <input
                            className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className='col-4 form-group mt-4'>
                        <label><FormattedMessage id={"manage-doctor.note"} /></label>
                        <input
                            className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>

                <div className='row mt-4'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id={"manage-doctor.specialist"} /></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id={"manage-doctor.specialist"} />}
                            name="selectedSpecialty"
                        /> 
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id={"manage-doctor.clinic"} /></label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id={"manage-doctor.clinic"} />}
                            name="selectedClinic"
                        /> 
                    </div>
                </div>

                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '500px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <div className='btn-save-doctor'>
                    <button
                        onClick={() => this.handleSaveContentMarkdown()}
                        className={'btn btn-primary mt-4 save-change-infor'}
                    >
                        {   availableData === true ? 
                            <span><FormattedMessage id={"manage-doctor.save-change"} /></span> : <span><FormattedMessage id={"manage-doctor.save-infor"} /></span>
                        }
                    </button>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
