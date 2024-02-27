import axios from 'axios';
import createHttpService from '../../components/HttpService';
import { baseUrl } from '../../shared/baseUrl';
 

 
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
   const HttpService = createHttpService();
  const { data } = await HttpService.get('/api/v1/auth')   
   return data
};


  //User Profile
const userprofile = async ( ) => {
  const HttpService = createHttpService(); 
  const { data } = await HttpService.get(`/api/v1/auth/profile`)  
  
   return data
};
  // View user by ID
const getUserProfileId = async (id: any) => {
  const HttpService = createHttpService(); 
  const { data } = await HttpService.get( `/api/v1/auth/${id}`)  
   return data
};


  // Forget Password
const forgetPassword = async (email: any) => { 
   const HttpService = createHttpService(); 
  const { data } = await HttpService.post( `/api/v1/auth/forgot-password`,{  "email": email })  
   return data
};

  //Update Password
const updatePassword = async (value: any) => { 
 const HttpService = createHttpService(); 
  const { data } = await HttpService.put( `/api/v1/auth/updatepassword`,value)  
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
    const HttpService = createHttpService(); 
  const { data } = await HttpService.get( `/api/v1/auth/current-user`)  
   return data
};
  // Supervisor User
const supervisorUser = async (id:any) => {  
    const HttpService = createHttpService(); 
  const { data } = await HttpService.get( `/api/v1/auth/users/supervisor/${id}`)  
   return data
};

  export const logoutUserAction = () => ( ) => {
  localStorage.removeItem("mwanga"); 
  localStorage.removeItem("mwangaUserDetails");
  // localStorage.removeItem("mwangaCurrentLob");  
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
  supervisorUser
}

export default authService
