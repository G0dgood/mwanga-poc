import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customerService from './CustomerService'
 
 
 

const initialState = { 
  data:   [],
  isError: false,
  isSuccess: false,
  isLoading: false, 
  message: '', 

  getdata:   [],
  getisError: false,
  getisSuccess: false,
  getisLoading: false, 
  getmessage: '', 

  getSetupBookdata:   [],
  getSetupBookisError: false,
  getSetupBookisSuccess: false,
  getSetupBookisLoading: false, 
  getSetupBookmessage: '', 

  viewdata:   [],
  viewisError: false,
  viewisSuccess: false,
  viewisLoading: false, 
  viewmessage: '', 

  updatedata:   [],
  updateisError: false,
  updateisSuccess: false,
  updateisLoading: false, 
  updatemessage: '', 

  uploaddata:   [],
  uploadisError: false,
  uploadisSuccess: false,
  uploadisLoading: false, 
  uploadmessage: '', 

  assignproductdata:   [],
  assignproductisError: false,
  assignproductisSuccess: false,
  assignproductisLoading: false, 
  assignproductmessage:'',

  getAllAssignProductsdata:   [],
  getAllAssignProductsisError: false,
  getAllAssignProductsisSuccess: false,
  getAllAssignProductsisLoading: false, 
  getAllAssignProductsmessage: '', 

  updateAssignProductsdata:   [],
  updateAssignProductsisError: false,
  updateAssignProductsisSuccess: false,
  updateAssignProductsisLoading: false, 
  updateAssignProductsmessage: '', 

  reductProductCountdata:   [],
  reductProductCountisError: false,
  reductProductCountisSuccess: false,
  reductProductCountisLoading: false, 
  reductProductCountmessage: '', 

  supervisorUsersdata:   [],
  supervisorUsersisError: false,
  supervisorUsersisSuccess: false,
  supervisorUsersisLoading: false, 
  supervisorUsersmessage: '', 

 
}



 

 
export const uploadBase = createAsyncThunk('inventory/uploadBase', async (data, thunkAPI) => {
  try {
    return await customerService.uploadBase(data)

  } catch (error: any) {  
    const message = (error.response && 
        error.response.data && 
        error.response.data.message) ||error.response.data.errors[0].message
      error.message ||
      error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})


export const getSetupBook = createAsyncThunk('inventory/getSetupBook', async (data, thunkAPI) => {
  try {
    return await customerService.getSetupBook( )

  } catch (error: any) {  
    const message = (error.response && 
        error.response.data && 
        error.response.data.message) ||error.response.data.errors[0].message
      error.message ||
      error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})


export const viewInventory = createAsyncThunk('inventory/viewInventory', async (data, thunkAPI) => {
  try {
    return await customerService.viewInventory(data)

  } catch (error: any) {  
    const message = (error.response && 
        error.response.data && 
        error.response.data.message) ||error.response.data.errors[0].message
      error.message ||
      error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})
export const updateInventory = createAsyncThunk('inventory/updateInventory', async (data, thunkAPI) => {
  try {
    // @ts-ignore
    return await customerService.updateInventory(data)

  } catch (error: any) {  
    const message = (error.response && 
        error.response.data && 
        error.response.data.message) ||error.response.data.errors[0].message
      error.message ||
      error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})
export const UploadInventorys = createAsyncThunk('inventory/UploadInventorys', async (data, thunkAPI) => {
  try {
    // @ts-ignore
    return await customerService.UploadInventorys(data)

  } catch (error: any) {  
    const message = (error.response && 
        error.response.data && 
        error.response.data.message) ||error.response.data.errors[0].message
      error.message ||
      error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})


export const assignProductToAgent = createAsyncThunk('inventory/assignProductToAgent', async (data, thunkAPI) => {
  try {
    // @ts-ignore
    return await customerService.assignProductToAgent(data)

  } catch (error: any) {  
    const message = (error.response && 
        error.response.data && 
        error.response.data.message) ||error.response.data.errors[0].message
      error.message ||
      error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})
export const getAllAssignProducts = createAsyncThunk('inventory/getAllAssignProducts', async (data, thunkAPI) => {
  try {
    // @ts-ignore
    return await customerService.getAllAssignProducts()

  } catch (error: any) {  
    const message = (error.response && 
        error.response.data && 
        error.response.data.message) ||error.response.data.errors[0].message
      error.message ||
      error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})
export const updateAssignedproduct = createAsyncThunk('inventory/updateAssignedproduct', async (data, thunkAPI) => {
  try {
    // @ts-ignore
    return await customerService.updateAssignedproduct(data)

  } catch (error: any) {  
    const message = (error.response && 
        error.response.data && 
        error.response.data.message) ||error.response.data.errors[0].message
      error.message ||
      error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})


export const reductProductCount = createAsyncThunk('inventory/reductProductCount', async (data, thunkAPI) => {
  try {
    // @ts-ignore
    return await customerService.reductProductCount(data)

  } catch (error: any) {  
    const message = (error.response && 
        error.response.data && 
        error.response.data.message) ||error.response.data.errors[0].message
      error.message ||
      error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})

export const supervisorUsers = createAsyncThunk('inventory/supervisorUsers', async (data, thunkAPI) => {
  try {
    // @ts-ignore
    return await customerService.supervisorUsers(data)

  } catch (error: any) {  
    const message = (error.response && 
        error.response.data && 
        error.response.data.message) ||error.response.data.errors[0].message
      error.message ||
      error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})


 

 
export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    reset: (state) => {   

      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = '' 

      state.getisLoading = false
      state.getisSuccess = false
      state.getisError = false
      state.getmessage = '' 

      state.getSetupBookisLoading = false
      state.getSetupBookisSuccess = false
      state.getSetupBookisError = false
      state.getSetupBookmessage = '' 

      state.viewisLoading = false
      state.viewisSuccess = false
      state.viewisError = false
      state.viewmessage = '' 

      state.updateisLoading = false
      state.updateisSuccess = false
      state.updateisError = false
      state.updatemessage = '' 

      state.uploadisLoading = false
      state.uploadisSuccess = false
      state.uploadisError = false
      state.uploadmessage = '' 

      state.assignproductisLoading = false
      state.assignproductisSuccess = false
      state.assignproductisError = false
      state.assignproductmessage = '' 

      state.getAllAssignProductsisLoading = false
      state.getAllAssignProductsisSuccess = false
      state.getAllAssignProductsisError = false
      state.getAllAssignProductsmessage = '' 

      state.updateAssignProductsisLoading = false
      state.updateAssignProductsisSuccess = false
      state.updateAssignProductsisError = false
      state.updateAssignProductsmessage = '' 

      state.reductProductCountisLoading = false
      state.reductProductCountisSuccess = false
      state.reductProductCountisError = false
      state.reductProductCountmessage = '' 

      state.supervisorUsersisLoading = false
      state.supervisorUsersisSuccess = false
      state.supervisorUsersisError = false
      state.supervisorUsersmessage = '' 
 
    }
  },


  extraReducers: (builder) => {
    builder 
      
     	.addCase(uploadBase.pending, (state:any) => {
				state.isLoading = true
			})
			.addCase(uploadBase.fulfilled, (state: any, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.data = action.payload
			})
			.addCase(uploadBase.rejected, (state: any, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.data = null
      })
      
     	.addCase(getSetupBook.pending, (state:any) => {
				state.getSetupBookisLoading = true
			})
			.addCase(getSetupBook.fulfilled, (state: any, action) => {
				state.getSetupBookisLoading = false
				state.getSetupBookisSuccess = true
				state.getSetupBookdata = action.payload?.data
			})
			.addCase(getSetupBook.rejected, (state: any, action) => {
				state.getSetupBookisLoading = false
				state.getSetupBookisError = true
				state.getSetupBookmessage = action.payload
				state.getSetupBookdata = null
      })
      

     	.addCase(viewInventory.pending, (state:any) => {
				state.viewisLoading = true
			})
			.addCase(viewInventory.fulfilled, (state: any, action) => {
				state.viewisLoading = false
				state.viewisSuccess = true
				state.viewdata = action.payload?.data
			})
			.addCase(viewInventory.rejected, (state: any, action) => {
				state.viewisLoading = false
				state.viewisError = true
				state.viewmessage = action.payload
				state.viewdata = null
      })
      
     	.addCase(updateInventory.pending, (state:any) => {
				state.updateisLoading = true
			})
			.addCase(updateInventory.fulfilled, (state: any, action) => {
				state.updateisLoading = false
				state.updateisSuccess = true
				state.updatedata = action.payload?.data
			})
			.addCase(updateInventory.rejected, (state: any, action) => {
				state.updateisLoading = false
				state.updateisError = true
				state.updatemessage = action.payload
				state.updatedata = null
      })
      
     	.addCase(UploadInventorys.pending, (state:any) => {
				state.uploadisLoading = true
			})
			.addCase(UploadInventorys.fulfilled, (state: any, action) => {
				state.uploadisLoading = false
				state.uploadisSuccess = true
				state.uploaddata = action.payload?.data
			})
			.addCase(UploadInventorys.rejected, (state: any, action) => {
				state.uploadisLoading = false
				state.uploadisError = true
				state.uploadmessage = action.payload
				state.uploaddata = null
			})

     	.addCase(assignProductToAgent.pending, (state:any) => {
				state.assignproductisLoading = true
			})
			.addCase(assignProductToAgent.fulfilled, (state: any, action) => {
				state.assignproductisLoading = false
				state.assignproductisSuccess = true
				state.assignproductdata = action.payload?.data
			})
			.addCase(assignProductToAgent.rejected, (state: any, action) => {
				state.assignproductisLoading = false
				state.assignproductisError = true
				state.assignproductmessage = action.payload
				state.assignproductdata = null
			})

     	.addCase(getAllAssignProducts.pending, (state:any) => {
				state.getAllAssignProductsisLoading = true
			})
			.addCase(getAllAssignProducts.fulfilled, (state: any, action) => {
				state.getAllAssignProductsisLoading = false
				state.getAllAssignProductsisSuccess = true
				state.getAllAssignProductsdata = action.payload?.data
			})
			.addCase(getAllAssignProducts.rejected, (state: any, action) => {
				state.getAllAssignProductsisLoading = false
				state.getAllAssignProductsisError = true
				state.getAllAssignProductsmessage = action.payload
				state.getAllAssignProductsdata = null
      })
      
     	.addCase(updateAssignedproduct.pending, (state:any) => {
				state.updateAssignProductsisLoading = true
			})
			.addCase(updateAssignedproduct.fulfilled, (state: any, action) => {
				state.updateAssignProductsisLoading = false
				state.updateAssignProductsisSuccess = true
				state.updateAssignProductsdata = action.payload?.data
			})
			.addCase(updateAssignedproduct.rejected, (state: any, action) => {
				state.updateAssignProductsisLoading = false
				state.updateAssignProductsisError = true
				state.updateAssignProductsmessage = action.payload
				state.updateAssignProductsdata = null
      })
      
     	.addCase(reductProductCount.pending, (state:any) => {
				state.reductProductCountisLoading = true
			})
			.addCase(reductProductCount.fulfilled, (state: any, action) => {
				state.reductProductCountisLoading = false
				state.reductProductCountisSuccess = true
				state.reductProductCountdata = action.payload?.data
			})
			.addCase(reductProductCount.rejected, (state: any, action) => {
				state.reductProductCountisLoading = false
				state.reductProductCountisError = true
				state.reductProductCountmessage = action.payload
				state.reductProductCountdata = null
			})
     	.addCase(supervisorUsers.pending, (state:any) => {
				state.supervisorUsersisLoading = true
			})
			.addCase(supervisorUsers.fulfilled, (state: any, action) => {
				state.supervisorUsersisLoading = false
				state.supervisorUsersisSuccess = true
				state.supervisorUsersdata = action.payload?.data
			})
			.addCase(supervisorUsers.rejected, (state: any, action) => {
				state.supervisorUsersisLoading = false
				state.supervisorUsersisError = true
				state.supervisorUsersmessage = action.payload
				state.supervisorUsersdata = null
			})

      
      
  },
})

 

export const { reset } = customerSlice.actions
export default customerSlice.reducer