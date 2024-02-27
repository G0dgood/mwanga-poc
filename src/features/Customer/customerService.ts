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
	const { endDate, startDate } = datas  
const base = `/api/v1/branch/customers` 
  const url = buildDynamicURL(null,startDate, endDate, null, null,base); 
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
	const HttpService = createHttpService();
	const { data }: any = await HttpService.get(`/api/v1/branch/responses/${id}`)  
	return data
}
const getAgentResponses = async () => { 
	const HttpService = createHttpService();
	const { data }: any = await HttpService.get(`/api/v1/branch/responses/agentresponses`)  
	return data
}
 
const getAllResponses = async (datas: any) => { 
	const HttpService = createHttpService();
	const { endDate, startDate } = datas  
const base = `/api/v1/branch/responses` 
  const url = buildDynamicURL(null,startDate, endDate, null, null,base); 
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
