   
export interface User {
  data: {
    privileges: Privilege[];
  };
}

export interface Privilege {
  role: string;
}

export function getUserPrivileges(): {
  isSuperAdmin: boolean;
  isSupervisor: boolean;
  isMis: boolean;  
  isAgent: boolean;  

} {

   
  	// @ts-ignore  
  const userString = JSON.parse(localStorage.getItem("mwanga"));
  
  
  const userInfo = userString ? userString : null;
  const privileges = userInfo || []; 

  const isSuperAdmin = privileges?.role === "admin";
  const isSupervisor = privileges?.role === "supervisor";
  const isMis = privileges?.role === "mis";
  const isAgent = privileges?.role === "agent";

  
  

  return { 
    isSuperAdmin,
    isSupervisor,  
    isMis,  
    isAgent
  };
}

 
