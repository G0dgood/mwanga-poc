import axios from 'axios'; 
import { baseUrl } from '../../shared/baseUrl';

 

// Login user 
const login = async (value: any) => {   
  const { data } = await axios.post(baseUrl + "/api/v1/auth", value);   
  localStorage.setItem('mwanga', JSON.stringify(data));  
  axios.defaults.headers.common['Authorization'] = `Bearer ${data?.token}`; 
  return data
}
   
  // logout  
const logout = async () => {  
  const { data } = await axios.get(baseUrl + "/api/v1/auth", );    
   return data
};


  //User Profile
const userprofile = async () => {
  const { data } = await axios.get(baseUrl + `/api/v1/auth/profile` );   
   localStorage.setItem("mwangauserDetails", JSON.stringify(data.user));
   return data
};
  // View user by ID
const getUserProfileId = async (id: any) => {  
  const { data } = await axios.get(baseUrl + `/api/v1/auth/${id}`, );  
   return data
};


  // Forget Password
const forgetPassword = async (email: any) => {   
  const { data } = await axios.post(baseUrl + `/api/v1/auth/forgot-password`,{  "email": email },)  
   return data
};

  //Update Password
const updatePassword = async (newPassword: any) => {  
  const { data } = await axios.put(baseUrl + `/api/v1/auth/updatepassword`,newPassword ,)  
   return data
};
  //Update Password
const adminupdateprofile = async (value: any) => { 
  const {id ,input} = value 
 const { data } = await axios.put(baseUrl + `/api/v1/users/${id}`,input ,)  
   return data
};
  //admin update Password
const adminupdatePassword = async (value: any) => { 
    const {id ,newPassword} = value 
  const { data } = await axios.put(baseUrl +`/api/v1/users/resetpassword/${id}`, {newPassword:newPassword} ,)  
   return data
};


  // Update Profile
const updateProfile = async (value: any) => {  
  const { data } = await axios.put( baseUrl +`/api/v1/auth/profile`, value ,)  
   return data
};

  // Current User
const currentUser = async () => {   
  const { data } = await axios.get(baseUrl + `/api/v1/auth/current-user`, ); 
   return data
};
  // Supervisor User
const supervisorUser = async (id:any) => {   
  const { data } = await axios.get(baseUrl + `/api/v1/auth/users/supervisor/${id}`, ); 
   return data
};

  export const logoutUserAction = () => ( ) => {
  localStorage.removeItem("mwanga"); 
  localStorage.removeItem("mwangauserDetails");  
};

 
const authService = {  
  logout,
  login,  
  userprofile,
  getUserProfileId,
  forgetPassword,
  updatePassword,
  updateProfile,
  currentUser,
  supervisorUser,
  adminupdatePassword,
  adminupdateprofile
}

export default authService