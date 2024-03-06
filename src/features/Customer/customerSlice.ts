import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customerService from './customerService'
 
 
 
 

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

  singledata:   [],
  singleisError: false,
  singleisSuccess: false,
  singleisLoading: false, 
  singlemessage: '', 

  createResponsedata:   [],
  createResponseisError: false,
  createResponseisSuccess: false,
  createResponseisLoading: false, 
  createResponsemessage: '', 

  createResponseIDdata:   [],
  createResponseIDisError: false,
  createResponseIDisSuccess: false,
  createResponseIDisLoading: false, 
  createResponseIDmessage: '', 

  alldata:   [],
  allisError: false,
  allisSuccess: false,
  allisLoading: false, 
  allmessage: '', 

  getAgentResponsesdata:   [],
  getAgentResponsesisError: false,
  getAgentResponsesisSuccess: false,
  getAgentResponsesisLoading: false, 
  getAgentResponsesmessage: '', 
 
 
}



 

 
export const uploadBase = createAsyncThunk('customer/uploadBase', async (data, thunkAPI) => {
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


export const getSetupBook = createAsyncThunk('customer/getSetupBook', async (data, thunkAPI) => {
  try {
    return await customerService.getSetupBook( data)

  } catch (error: any) {  
    const message = (error.response && 
        error.response.data && 
        error.response.data.message) ||error.response.data.errors[0].message
      error.message ||
      error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})

export const getASingleResponse = createAsyncThunk('customer/getASingleResponse', async (data, thunkAPI) => {
  try {
    return await customerService.getASingleResponse(data)

  } catch (error: any) {  
    const message = (error.response && 
        error.response.data && 
        error.response.data.message) ||error.response.data.errors[0].message
      error.message ||
      error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})
export const createResponse = createAsyncThunk('customer/createResponse', async (data, thunkAPI) => {
  try {
    return await customerService.createResponse(data)

  } catch (error: any) {  
    const message = (error.response && 
        error.response.data && 
        error.response.data.message) ||error.response.data.errors[0].message
      error.message ||
      error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})
export const createResponseID = createAsyncThunk('customer/createResponseID', async (data, thunkAPI) => {
  try {
    return await customerService.createResponseID(data)

  } catch (error: any) {  
    const message = (error.response && 
        error.response.data && 
        error.response.data.message) ||error.response.data.errors[0].message
      error.message ||
      error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})
export const getAllResponses = createAsyncThunk('customer/getAllResponses', async (data, thunkAPI) => {
  try {
    return await customerService.getAllResponses(data)

  } catch (error: any) {  
    const message = (error.response && 
        error.response.data && 
        error.response.data.message) ||error.response.data.errors[0].message
      error.message ||
      error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})
export const getAgentResponses = createAsyncThunk('customer/getAgentResponses', async (data, thunkAPI) => {
  try {
    return await customerService.getAgentResponses(data)

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

      state.singleisLoading = false
      state.singleisSuccess = false
      state.singleisError = false
      state.singlemessage = '' 
      
      state.createResponseisLoading = false
      state.createResponseisSuccess = false
      state.createResponseisError = false
      state.createResponsemessage = ''  

      state.createResponseIDisLoading = false
      state.createResponseIDisSuccess = false
      state.createResponseIDisError = false
      state.createResponseIDmessage = ''  

      state.allisLoading = false
      state.allisSuccess = false
      state.allisError = false
      state.allmessage = ''  

      state.getAgentResponsesisLoading = false
      state.getAgentResponsesisSuccess = false
      state.getAgentResponsesisError = false
      state.getAgentResponsesmessage = ''  
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
				state.getSetupBookdata = action.payload
			})
			.addCase(getSetupBook.rejected, (state: any, action) => {
				state.getSetupBookisLoading = false
				state.getSetupBookisError = true
				state.getSetupBookmessage = action.payload
				state.getSetupBookdata = null
      })

     	.addCase(getASingleResponse.pending, (state:any) => {
				state.singleisLoading = true
			})
			.addCase(getASingleResponse.fulfilled, (state: any, action) => {
				state.singleisLoading = false
				state.singleisSuccess = true
				state.singledata = action.payload
			})
			.addCase(getASingleResponse.rejected, (state: any, action) => {
				state.singleisLoading = false
				state.singleisError = true
				state.singlemessage = action.payload
				state.singledata = null
      })
           
     	.addCase(createResponse.pending, (state:any) => {
				state.createResponseisLoading = true
			})
			.addCase(createResponse.fulfilled, (state: any, action) => {
				state.createResponseisLoading = false
				state.createResponseisSuccess = true
				state.createResponsedata = action.payload
			})
			.addCase(createResponse.rejected, (state: any, action) => {
				state.createResponseisLoading = false
				state.createResponseisError = true
				state.createResponsemessage = action.payload
				state.createResponsedata = null
      })

     	.addCase(createResponseID.pending, (state:any) => {
				state.createResponseIDisLoading = true
			})
			.addCase(createResponseID.fulfilled, (state: any, action) => {
				state.createResponseIDisLoading = false
				state.createResponseIDisSuccess = true
				state.createResponseIDdata = action.payload
			})
			.addCase(createResponseID.rejected, (state: any, action) => {
				state.createResponseIDisLoading = false
				state.createResponseIDisError = true
				state.createResponseIDmessage = action.payload
				state.createResponseIDdata = null
      })

     	.addCase(getAllResponses.pending, (state:any) => {
				state.allisLoading = true
			})
			.addCase(getAllResponses.fulfilled, (state: any, action) => {
				state.allisLoading = false
				state.allisSuccess = true
				state.alldata = action.payload
			})
			.addCase(getAllResponses.rejected, (state: any, action) => {
				state.allisLoading = false
				state.allisError = true
				state.allmessage = action.payload
				state.alldata = null
      })

     	.addCase(getAgentResponses.pending, (state:any) => {
				state.getAgentResponsesisLoading = true
			})
			.addCase(getAgentResponses.fulfilled, (state: any, action) => {
				state.getAgentResponsesisLoading = false
				state.getAgentResponsesisSuccess = true
				state.getAgentResponsesdata = action.payload
			})
			.addCase(getAgentResponses.rejected, (state: any, action) => {
				state.getAgentResponsesisLoading = false
				state.getAgentResponsesisError = true
				state.getAgentResponsesmessage = action.payload
				state.getAgentResponsesdata = null
      })
           
      
  },
})

 

export const { reset } = customerSlice.actions
export default customerSlice.reducer