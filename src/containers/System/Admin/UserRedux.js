import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from "../../../store/actions";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import './UserRedux.scss';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            position: '',
            role: '',
            image: '',

            action: '',
            userEditId: '',

        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // this.props.dispatch(actions.fetchGenderStart());

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux; 
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux; 
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
            })
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux
            let arrPositions = this.props.positionRedux
            let arrRoles = this.props.roleRedux

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                image: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgUrl: '',
            })
        }
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            console.log('Check base64: ', base64);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                image: base64,
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgUrl) {
            return;
        }
        this.setState({
            isOpen: true,
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        let action = this.state.action

        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux create user
            this.props.createNewUser({
                id: this.state.id,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                gender: this.state.gender,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                roleId: this.state.role,
                positionId: this.state.position,
                image: this.state.image,
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            //fire redux edit user
            this.props.editUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                gender: this.state.gender,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                roleId: this.state.role,
                positionId: this.state.position,
                image: this.state.image,
            })
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber']
        for (let i = 0; i < arrCheck.length; i++){
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Missing required parameters: ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }

        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            image: '',
            previewImgUrl: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
        })
    }

    render() {
        let genders = this.state.genderArr;
        let isGetGenders = this.props.isLoadingGender;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;

        let { email, password, firstName, lastName, address, phoneNumber, gender, position, role, image } = this.state;

        return (
            <div className='user-redux-container'>
                <div className='title'>Manage user with Redux</div>
                <div>{isGetGenders === true ? "Loading genders" : ''}</div> 
                <div className="user-redux-body">
                    <div className='container'>
                        <form>
                            <div class="row">
                                <h2><FormattedMessage id={'manage-user.add-user'}/></h2>
                                <div class="form-group col-md-6 mt-3">
                                    <label for="inputEmail4"><FormattedMessage id={'manage-user.email'}/></label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        placeholder="Email..."
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                        value={email}
                                        onChange={(event) => {this.onChangeInput(event, 'email')}}
                                    />
                                </div>
                                <div class="form-group col-md-6 mt-3">
                                    <label for="inputPassword4"><FormattedMessage id={'manage-user.password'}/></label>
                                    <input type="password" class="form-control" placeholder="Password..."
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                        value={password}
                                        onChange={(event) => {this.onChangeInput(event, 'password')}}
                                    />
                                </div>
                                <div class="form-group col-md-6 mt-3">
                                    <label for="inputAddress"><FormattedMessage id={'manage-user.first-name'}/></label>
                                    <input type="text" class="form-control" placeholder="First name..."
                                        value={firstName}
                                        onChange={(event) => {this.onChangeInput(event, 'firstName')}}
                                    />         
                                </div>
                                <div class="form-group col-md-6 mt-3">
                                    <label for="inputAddress2"><FormattedMessage id={'manage-user.last-name'}/></label>
                                    <input type="text" class="form-control" placeholder="Last name..."
                                        value={lastName}
                                        onChange={(event) => {this.onChangeInput(event, 'lastName')}}
                                    />
                                </div>
                            </div>
                            <div class="form-group mt-3">
                                <label for="inputCity"><FormattedMessage id={'manage-user.address'}/></label>
                                <input type="text" class="form-control" placeholder="1234 Main St"
                                    value={address}
                                    onChange={(event) => {this.onChangeInput(event, 'address')}}
                                />
                            </div>
                            <div class="row">
                                <div class="form-group col-md-6 mt-3">
                                    <label for="inputCity"><FormattedMessage id={'manage-user.phone-number'}/></label>
                                    <input type="text" class="form-control" placeholder="Phone number..."
                                        value={phoneNumber}
                                        onChange={(event) => {this.onChangeInput(event, 'phoneNumber')}}
                                    />
                                </div>
                                <div class="form-group col-md-6 mt-3">
                                    <label><FormattedMessage id={'manage-user.gender'}/></label>
                                    <select
                                        class="form-select"
                                        onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                        value={gender}
                                    >
                                        {genders && genders.length > 0 && genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-3 mt-3">
                                    <label><FormattedMessage id={'manage-user.position'}/></label>
                                    <select
                                        class="form-select"
                                        onChange={(event) => { this.onChangeInput(event, 'position') }}
                                        value={position}
                                    >
                                        {positions && positions.length > 0 && positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{ language === LANGUAGES.VI ? item.valueVi : item.valueEn }</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div class="form-group col-md-3 mt-3">
                                    <label><FormattedMessage id={'manage-user.role'}/></label>
                                    <select
                                        class="form-select"
                                        onChange={(event) => { this.onChangeInput(event, 'role') }}
                                        value={role}
                                    >
                                        {roles && roles.length > 0 && roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{ language === LANGUAGES.VI ? item.valueVi : item.valueEn }</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div class="form-group col-md-3 mt-3">
                                    <label for="inputAddress2"><FormattedMessage id={'manage-user.image'} /></label>
                                    <div className='preview-block'>
                                        <input
                                            id='previewImg'
                                            type="file"
                                            class="form-control"
                                            onChange={(event) => this.handleOnchangeImage(event)}
                                            hidden
                                        />
                                        <label className='upload-image' htmlFor='previewImg'>Tải ảnh lên <i className="fas fa-upload"></i></label>
                                        <div
                                            className='preview-image'
                                            style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                            onClick={() => this.openPreviewImage()}
                                        >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='save-btn'>
                                <button
                                    class="btn btn-primary mt-3"
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id={'manage-user.edit'} /> :
                                        <FormattedMessage id={'manage-user.save'} />
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <TableManageUser 
                    handleEditUserFromParentKey={this.handleEditUserFromParent}
                    action={this.state.action}
                />

                {this.state.isOpen === true && 
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data)),

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
