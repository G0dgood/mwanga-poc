import axios from 'axios'  
import {  baseUrl } from '../../shared/baseUrl';
import createHttpService from '../../components/HttpService';
 
 
	// @ts-ignore
const user = JSON.parse(localStorage.getItem("userinvento"));
 
 
const uploadBase = async (values: any) => { 
	const { jsonData, setProgress } = values   
	console.log('jsonData-jsonData-jsonData',jsonData)
		const { data }:  any = await axios.post( baseUrl + `/api/v1/customers/jsonupload`,{ data: jsonData }, {
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


const getSetupBook = async ( ) => {
	const HttpService = createHttpService();
	const { data }: any = await HttpService.get('/api/v1/customers') 
	return data
}
 
// const getInventory = async (datas: any) => { 
// 	const HttpService = createHttpService();
// 	const { endDates, startDates } = datas  
// const base = `/api/v1/product` 
//   const url = buildDynamicURL(null,startDates, endDates, null, null,base); 
// 	const { data }: any = await HttpService.get(url) 
 
// return data
// }

const viewInventory = async (id: any) => {
	const HttpService = createHttpService();
	const { data }: any = await HttpService.get( `/api/v1/customers/jsonupload/${id}`) 
	return data
}


const updateInventory = async (newdata: any) => {
	const HttpService = createHttpService();
	const { value, id } = newdata 
	 
	const { data }:  any = await HttpService.put( `/api/v1/product/${id}`, value) 
	return data
}


const UploadInventorys = async (values: any) => {
	 
	const { file, setProgress } = values 
   const formData = new FormData();
    formData.append("file", file); 
 
	const { data }:  any = await axios.post( baseUrl + `/api/v1/product/upsert-product`,formData, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (data) => { 
												// @ts-ignore
            setProgress(Math.round((100 * data.loaded) / data.total));
          },
        }) 
	return data
}

const assignProductToAgent = async (value:any) => {
const HttpService = createHttpService();
	const { data }: any = await HttpService.post( '/api/v1/assigned-product',value) 
 
	return data
}

const getAllAssignProducts = async (inputs: any) => {
	const HttpService = createHttpService();
	const { data }: any = await HttpService.get( '/api/v1/assigned-product') 
	 
	return data
}

const updateAssignedproduct = async (value: any) => {
	const HttpService = createHttpService();
	const { count, id } = value
	const { data }:  any = await HttpService.put( `/api/v1/assigned-product/${id}`, count) 
	return data
}


const reductProductCount = async (value: any) => {
	const HttpService = createHttpService();
	const { count, id } = value  
	const { data }:  any = await HttpService.put( `/api/v1/product/reduce-count/${id}`, count) 
	return data
}

const supervisorUsers = async (id: any) => {
	const HttpService = createHttpService(); 
	const { data }:  any = await HttpService.get( `/api/v1/dashboard/supervisor/${id}`) 
	return data
}




const customerService = {
	uploadBase, 
	getSetupBook,
	viewInventory,
	updateInventory,
	UploadInventorys,
 assignProductToAgent,
	getAllAssignProducts,
	updateAssignedproduct,
	reductProductCount,
	supervisorUsers
}

export default customerService
