import axios from 'axios'  
import {  baseUrl, buildDynamicURL } from '../../shared/baseUrl';
import createHttpService from '../../components/HttpService';
 
 
	// @ts-ignore
const user = JSON.parse(localStorage.getItem("mwanga"));
 
 
const uploadBase = async (values: any) => { 
	const { jsonData, setProgress } = values    
		const { data } = await axios.post( baseUrl + `/api/v1/branch/customers/jsonupload`,{ data: jsonData }, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json", 
          },
          onUploadProgress: (data:any) => {  
            setProgress(Math.round((100 * data.loaded) / data.total));
          },
        }) 
	return data
}

const getSetupBook = async (datas: any) => { 
	const HttpService = createHttpService();
	const { endDate, startDate ,limit ,page} = datas  
const base = `/api/v1/branch/customers` 
  const url = buildDynamicURL(null,startDate, endDate, limit, page,base); 
	const { data }: any = await HttpService.get(url)  
return data
}

 

const getASingleResponse= async ( phone: any) => {
	const HttpService = createHttpService();
	const { data }: any = await HttpService.get(`/api/v1/branch/customers/${phone}`)  
	return data
}

const createResponse = async (value: any) => { 
	const {input , customerDetailsId} = value 
	const HttpService = createHttpService();
	const { data }: any = await HttpService.post(`/api/v1/branch/responses/${customerDetailsId}`, input)  
	return data
}
const createResponseID = async (id: any) => { 
 const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };

  const { data } = await axios.get(baseUrl + `/api/v1/branch/responses/${id}`, config);   
	return data
}
const getAgentResponses = async () => { 
	 const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };

  const { data } = await axios.get(baseUrl + `/api/v1/branch/responses/agentresponses`, config);  
	return data
}
 
const getAllResponses = async (datas: any) => { 
	const HttpService = createHttpService();
	const { endDate, startDate, limit, page, } = datas  
const base = `/api/v1/branch/responses` 
  const url = buildDynamicURL(null,startDate, endDate,limit, page,base); 
	const { data }: any = await HttpService.get(url)  
return data
}

  

const customerService = {
	uploadBase, 
	getSetupBook, 
	getASingleResponse,
	createResponse,
	createResponseID,
	getAllResponses,
	getAgentResponses
}

export default customerService
