import createHttpService from '../../components/HttpService';
 
  
 // Registration
const userRegistration = async (input: any) => {  
  	const HttpService = createHttpService();
  const { data } = await HttpService.post('/api/v1/users/register',input) 
  return data
}

 // Get All Reguser
const getallReguser = async () => {  
  const HttpService = createHttpService();
  const { data } = await HttpService.get( '/api/v1/users' ) 
  return data
}
 // Get All Reguser
const getallRoles = async () => {  
  const HttpService = createHttpService();
  const { data } = await HttpService.get('/api/v1/roles')  
  return data
}

 // Get Login User
const getLoginUser = async () => {  
    const HttpService = createHttpService();
  const { data } = await HttpService.get('/api/v1/auth/users/logged-in',  )   
  return data
}


// Get user by Agent role
const getUserProfileById = async (id:any) => {  
  const HttpService = createHttpService();
  const { data } = await HttpService.get( `/api/v1/auth/${id}`) 
  return data
}

//   //Update Password
// const adminUpdateUser = async (value: any) => { 
//  const HttpService = createHttpService(); 
//   const { data } = await HttpService.put( `/api/v1/users/${id}`,value)  
//    return data
// };

// Admin Update User
const adminUpdateUser = async (value: any) => {  
  const HttpService = createHttpService();
  const {id ,input} = value
  const { data } = await HttpService.put(`/api/v1/users/${id}` ,input )  
  return data
}

// Reset  password
const adminResetPassword = async (value: any) => {  
  const HttpService = createHttpService();
  const {id ,newPassword} = value
  const { data } = await HttpService.put(`/api/v1/auth/reset-password/${id}` ,{"password":newPassword } )  
  return data
}


// Get user by Agent role
const edituser = async (value: any) => {  
    const HttpService = createHttpService();
  const { data } = await HttpService.put( '/api/v1/auth/users/admin-update-user',value ) 
  return data
}

// Get Supervisors
const getsupervisors = async ( ) => {  
    const HttpService = createHttpService(); 
    const { data } = await HttpService.get('/api/v1/users/supervisors') 
  return data
}
// Get Supervisors
const agentByLOBAction = async (LOB: any ) => {  
    const HttpService = createHttpService(); 
    const { data } = await HttpService.get(`/api/v1/auth/lob/${LOB}`) 
  return data
}


const registrationSlice = { 
  adminUpdateUser,
  userRegistration,
  getallReguser,
  getLoginUser,
  getUserProfileById, 
  adminResetPassword,
  edituser,
  getsupervisors,
  agentByLOBAction,
  getallRoles
}

export default registrationSlice