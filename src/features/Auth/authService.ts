import axios from 'axios';
import createHttpService from '../../components/HttpService';
import { baseUrl } from '../../shared/baseUrl';
 // @ts-ignore
export const userInfo = JSON.parse(localStorage.getItem("mwanga"));
 
// Login user 
const login = async (value: any) => {   
  const { data } = await axios.post(baseUrl + "/api/v1/auth", value);   
  if (data) { 
    try {    
      localStorage.setItem('mwanga', JSON.stringify(data));  
  } catch (e) {  console.log(`isLoggedIn in error ${e}`)  }  }
  return data
}
   
  // logout  
const logout = async () => { 
     const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

  const { data } = await axios.get(baseUrl + "/api/v1/auth", config);    
   return data
};


  //User Profile
const userprofile = async () => {
   const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

  const { data } = await axios.get(baseUrl + "/api/v1/auth/profile", config);   
   localStorage.setItem("mwangauserDetails", JSON.stringify(data.user));
   return data
};
  // View user by ID
const getUserProfileId = async (id: any) => { 
     const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

  const { data } = await axios.get(baseUrl + `/api/v1/auth/${id}`, config);  
   return data
};


  // Forget Password
const forgetPassword = async (email: any) => { 
   const HttpService = createHttpService(); 
  const { data } = await HttpService.post( `/api/v1/auth/forgot-password`,{  "email": email })  
   return data
};

  //Update Password
const updatePassword = async (newPassword: any) => { 
 const HttpService = createHttpService(); 
  const { data } = await HttpService.put( `/api/v1/auth/updatepassword`,newPassword)  
   return data
};
  //Update Password
const adminupdateprofile = async (value: any) => { 
  const {id ,input} = value
 const HttpService = createHttpService(); 
  const { data } = await HttpService.put( `/api/v1/users/${id}`,input)  
   return data
};
  //admin update Password
const adminupdatePassword = async (value: any) => { 
    const {id ,newPassword} = value
 const HttpService = createHttpService(); 
  const { data } = await HttpService.put(`/api/v1/users/resetpassword/${id}`, {newPassword:newPassword})  
   return data
};


  // Update Profile
const updateProfile = async (value: any) => { 
  const HttpService = createHttpService(); 
  const { data } = await HttpService.put( `/api/v1/auth/profile`, value)  
   return data
};

  // Current User
const currentUser = async () => {  
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

  const { data } = await axios.get(baseUrl + `/api/v1/auth/current-user`, config); 
   return data
};
  // Supervisor User
const supervisorUser = async (id:any) => {  
   const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

  const { data } = await axios.get(baseUrl + `/api/v1/auth/users/supervisor/${id}`, config); 
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
