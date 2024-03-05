import axios from 'axios'; 
import { baseUrl } from '../../shared/baseUrl'; 
 

 
const userRegistration = async (input: any) => {  
 
   const { data } = await axios.post(baseUrl +'/api/v1/users/register',input   ) 
  return data
}

 // Get All Reguser
const getallReguser = async () => {   
  const { data } = await axios.get(baseUrl + '/api/v1/users');    
  return data
}
 // Get All Reguser
const getallRoles = async () => {   
   const { data } = await axios.get(baseUrl +'/api/v1/roles')  
  return data
}

 // Get Login User
const getLoginUser = async () => {   
   const { data } = await axios.get(baseUrl +'/api/v1/auth/users/logged-in' )   
  return data
}


// Get User Profile By Id
const getUserProfileById = async (id:any) => {   
   const { data } = await axios.get(baseUrl + `/api/v1/auth/${id}` ) 
  return data
}

// Get Team members
const getTeammembers = async (id:any) => {   
   const { data } = await axios.post(baseUrl + `/api/v1/auth/getteam`,	{ id:id}   ) 
  return data
}

 
// Admin Update User
const adminUpdateUser = async (value: any) => {   
  const {id ,input} = value
   const { data } = await axios.put(baseUrl +`/api/v1/users/${id}` ,input   )  
  return data
}

// Admin Reset Password
const adminResetPassword = async (value: any) => { 
  const {id ,newPassword} = value
   const { data } = await axios.put(baseUrl +`/api/v1/auth/reset-password/${id}` ,{"password":newPassword }   )  
  return data
}


// Edit user
const edituser = async (value: any) => {   
   const { data } = await axios.put( baseUrl +'/api/v1/auth/users/admin-update-user',value   ) 
  return data
}

// Get Supervisors
const getsupervisors = async ( ) => {   
     const { data } = await axios.get(baseUrl +'/api/v1/users/supervisors'  ) 
  return data
}
// agent By LOB Action
const agentByLOBAction = async (LOB: any ) => {  
     const { data } = await axios.get(baseUrl +`/api/v1/auth/lob/${LOB}`   ) 
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
  getallRoles,
  getTeammembers
}

export default registrationSlice