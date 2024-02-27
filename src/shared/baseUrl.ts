// export const baseUrl = "https://outcesscrmapi.herokuapp.com";

export const baseUrl = "http://localhost:5000";
// export const baseUrl = "https://crm.outcess.com:443"; 


export const buildDynamicURL = (id: any, fromDate: any, endDate: any, limit: any, page: any, base: any) => {
 
  let baseURL = `${base}`;
  const queryParams = [];

    // Add 'id' to the query parameters if it's not null or undefined
  // if (id !== null && id !== undefined) {
  //   queryParams.push(`id=${id}`);
  // }

  // Add 'fromDate' to the query parameters if it's not null or undefined
 if (fromDate !== null && fromDate !== undefined && !Array.isArray(fromDate)) {
  queryParams.push(`fromDate=${fromDate}`);
}

  // Add 'endDate' to the query parameters if it's not null or undefined
  if (endDate !== null && endDate !== undefined && !Array.isArray(endDate)) {
    queryParams.push(`endDate=${endDate}`);
  }

  // Add 'limit' to the query parameters if it's not null or undefined
  if (limit !== null && limit !== undefined) {
    queryParams.push(`limit=${limit}`);
  }

  // Add 'page' to the query parameters if it's not null or undefined
  if (page !== null && page !== undefined) {
    queryParams.push(`page=${page}`);
  }

 // Combine the base URL and query parameters
  if (queryParams.length > 0) {
    baseURL += "?" + queryParams.join("&");
  }

    // Add 'id' to the URL if it's not null or undefined
  // if (id !== null && id !== undefined) {
  //   baseURL += `${id}`;
  // }

  return baseURL;
}
