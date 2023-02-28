import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './TableManageUser.scss';
import { LANGUAGES } from '../../../utils';

// import MarkdownIt from 'markdown-it';
// import MdEditor from 'react-markdown-editor-lite';
// // import style manually
// import 'react-markdown-editor-lite/lib/index.css';

// // Register plugins if required
// // MdEditor.use(YOUR_PLUGINS_HERE);

// // Initialize a markdown parser
// const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
            genderArr: [],
            positionArr: [],
            roleArr: [],
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
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
    }

    handleDeleteUser = (user) => {
        let confirmDelete = window.confirm('Do you want to delete this user ?');
        if (confirmDelete) {
            this.props.deleteUserRedux(user.id);
        }
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user)
    }

    render() {
        let arrUsers = this.state.usersRedux;
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;

        console.log('arrUser:' , arrUsers);

        return (
            <>
                <div className="container table-infor">
                    <div className='users-table mt-3 mx-1'>
                        <table class="table table-striped table-hover table-bordered">
                            <thead class="table-info">
                                <tr>
                                    <th>Email</th>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Address</th>
                                    <th>Phone number</th>
                                    <th>Gender</th>
                                    <th>Position</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
                                    console.log('item: ', item);
                                    return (
                                        <tr key={index}>
                                            <td>{ item.email }</td>
                                            <td>{ item.firstName }</td>
                                            <td>{ item.lastName }</td>
                                            <td>{ item.address }</td>
                                            <td>{ item.phoneNumber }</td>
                                            <td>{ item.gender }</td>
                                            <td>{ item.positionId }</td>
                                            <td>{ item.roleId }</td>
                                            <td>
                                                <button
                                                    className='btn-edit'
                                                    onClick={() => this.handleEditUser(item)}
                                                ><i className="fas fa-edit"></i>
                                                </button>
                                                <button
                                                    className='btn-delete'
                                                    onClick={() => this.handleDeleteUser(item)}
                                                ><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
