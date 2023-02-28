import axios from "../axios"

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', {email: userEmail, password: userPassword});
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    console.log('check data from service: ', data);
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    // return axios.delete('/api/delete-user', { id: userId });
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = (limit) => {
    return axios.get(`/api/get-all-doctors`)
}

const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctors', data)
}

const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor?id=${inputId}`)
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getDoctorInforExaminationById = (doctorId) => {
    return axios.get(`/api/get-doctor-infor-examination-by-id?doctorId=${doctorId}`)
}

const getIntroductionDoctorById = (doctorId) => {
    return axios.get(`/api/get-introduction-doctor?doctorId=${doctorId}`)
}

const postPatientBookingAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}

const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}

const createNewSpecialist = (data) => {
    return axios.post('/api/create-new-specialist', data)
}

const getAllSpecialist = () => {
    return axios.get(`/api/get-specialist`)
}

const getAllDetailSpecialistById = (data) => {
    return axios.get(`/api/get-detail-specialist-by-id?id=${data.id}&location=${data.location}`)
}

const createNewClinic = (data) => {
    return axios.post('/api/create-new-clinic', data)
}

const getAllClinic = () => {
    return axios.get(`/api/get-clinic`)
}

const getAllDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}

const getAllAppointment = (data) => {
    return axios.get(`/api/get-list-appointment?doctorId=${data.doctorId}&date=${data.date}`)
}

const postSendBill = (data) => {
    return axios.post('/api/send-bill', data)
}


export {
    handleLoginApi, 
    getAllUsers, 
    createNewUserService, 
    deleteUserService, 
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService,
    getDetailInforDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getDoctorInforExaminationById,
    getIntroductionDoctorById,
    postPatientBookingAppointment,
    postVerifyBookAppointment,
    createNewSpecialist,
    getAllSpecialist,
    getAllDetailSpecialistById,
    createNewClinic,
    getAllClinic,
    getAllDetailClinicById,
    getAllAppointment,
    postSendBill
}