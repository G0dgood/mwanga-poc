import axios from 'axios';
// @ts-ignore
export const userInfo = JSON.parse(localStorage.getItem("mwanga"));
// @ts-ignore
export const user = JSON.parse(localStorage.getItem("mwanga"));
// @ts-ignore
export const lob = JSON.parse(localStorage.getItem("mwangaCurrentLob"));
 
// Import Axios


// Create an Axios instance with default configuration
// const axiosInstance = axios.create({ 
//   headers: {
//     'Content-Type': 'application/json', 
//   Authorization: `Bearer ${userInfo?.token}`,
//   }
// });

// export default axiosInstance;

 
 
export const config = {
         headers: {
          "Content-Type": "application/json", 
           Authorization: `Bearer ${userInfo?.token}`,
         },
  };   


  