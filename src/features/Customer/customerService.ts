import axios from 'axios'  
import {  baseUrl, buildDynamicURL } from '../../shared/baseUrl';
 
 
 
 
const uploadBase = async (values: any) => { 
	const { jsonData, setProgress } = values    
		const { data } = await axios.post( baseUrl + `/api/v1/branch/customers/jsonupload`,{ data: jsonData }, { 
          onUploadProgress: (data:any) => {  
            setProgress(Math.round((100 * data.loaded) / data.total));
          },
        }) 
	return data
}

const getSetupBook = async (datas: any) => {  
	const { endDate, startDate ,limit ,page} = datas  
const base = baseUrl + `/api/v1/branch/customers` 
  const url = buildDynamicURL(null,startDate, endDate, limit, page,base); 
	const { data } = await axios.get(url )  
return data
}

 

const getASingleResponse= async ( phone: any) => { 
	const { data } = await axios.get(baseUrl +`/api/v1/branch/customers/${phone}`)  
	return data
}

const createResponse = async (value: any) => { 
	const {input , customerDetailsId} = value  
	const { data } = await axios.post(baseUrl +`/api/v1/branch/responses/${customerDetailsId}`, input)  
	return data
}
const createResponseID = async (id: any) => {  
  const { data } = await axios.get(baseUrl + `/api/v1/branch/responses/${id}` );   
	return data
}
const getAgentResponses = async (datas: any) => { 
	const { endDate, startDate, limit, page, } = datas  
	const base = baseUrl +`/api/v1/branch/responses/agentresponses`  
	const url = buildDynamicURL(null, startDate, endDate, limit, page, base); 
		const { data } = await axios.get(url)  
	return data
}
 
const getAllResponses = async (datas: any) => {  
	const { endDate, startDate, limit, page, } = datas  
const base = baseUrl +`/api/v1/branch/responses` 
  const url = buildDynamicURL(null,startDate, endDate,limit, page,base); 
	const { data } = await axios.get(url)  
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
