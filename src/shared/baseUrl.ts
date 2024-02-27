// export const baseUrl = "https://outcesscrmapi.herokuapp.com";
export const baseUrl = "https://105.112.129.219:443";

// export const baseUrl = "http://localhost:5000";
// export const baseUrl = "https://crm.outcess.com:443"; 


export const buildDynamicURL = (id: any, fromDate: any, toDate: any, limit: any, page: any, base: any) => {
 
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

  // Add 'toDate' to the query parameters if it's not null or undefined
  if (toDate !== null && toDate !== undefined && !Array.isArray(toDate)) {
    queryParams.push(`toDate=${toDate}`);
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
