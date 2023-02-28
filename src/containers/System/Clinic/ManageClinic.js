import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { LANGUAGES, CommonUtils } from '../../../utils';
import { toast } from 'react-toastify';
import { createNewClinic } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (this.props.listUsers !== prevProps.listUsers) {

        // }
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }

     handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            })
        }
    }

    handleSaveNewClinic = async () => {
        let res = await createNewClinic(this.state);
        if (res && res.errCode === 0) {
            toast.success('Lưu thông tin cơ sở y tế thành công')
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        } else {
            toast.error('Lưu thông tin cơ sở y tế thất bại')
            console.log('check res: ', res);
        }
        console.log('click: ', this.state);
    }

    render() {
        return (
            <div className='manage-specialist-container'>
                <div className='manage-specialist-content'>
                    <div className='ms-title'>Quản lý cơ sở y tế</div>
                    <div className='add-new-specialist row'>
                        <div className='col-6 form-goup mt-3'>
                            <label>Tên cơ sở y tế</label>
                            <input type='text' className='form-control' value={this.state.name}
                                onChange={(event) => this.handleOnChangeInput(event, 'name')}
                            />
                        </div>
                        <div className='col-6 form-goup mt-3'>
                            <label>Ảnh cơ sở y tế</label>
                            <input type='file' className='form-control'
                                onChange={(event) => this.handleOnchangeImage(event)}
                            />
                        </div>
                        <div className='col-6 form-goup mt-3'>
                            <label>Địa chỉ cơ sở y tế</label>
                            <input type='text' className='form-control' value={this.state.address}
                                onChange={(event) => this.handleOnChangeInput(event, 'address')}
                            />
                        </div>
                        <div className='markdown-specialist col-12 mt-5'>
                            <MdEditor
                                renderHTML={text => mdParser.render(text)} 
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className='btn-save-specialist mt-5'>
                            <button className='btn btn-primary' onClick={() => this.handleSaveNewClinic()}>Lưu thông tin</button>
                        </div>
                    </div>

                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
