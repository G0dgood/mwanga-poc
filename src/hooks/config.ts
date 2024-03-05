 
// @ts-ignore
export const userInfo = JSON.parse(localStorage.getItem("mwanga"));
// @ts-ignore
export const lob = JSON.parse(localStorage.getItem("mwangaCurrentLob"));
 
 
 

export const config = {
  
         headers: {
          "Content-Type": "application/json", 
           Authorization: `Bearer ${userInfo?.token}`,
         },
  };   
