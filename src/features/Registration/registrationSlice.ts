import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import registrationService from './registrationService'


const initialState = {
  data:   [],
  isError: false,
  isSuccess: false,
  isLoading: false, 
  message: '',
  error: '', 

  dataAll:   [],
  isErrorAll: false,
  isSuccessAll: false,
  isLoadingAll: false, 
  messageAll: '',
  errorAll: '', 

  dataLoginUser:   [],
  isErrorLoginUser: false,
  isSuccessLoginUser: false,
  isLoadingLoginUser: false, 
  messageLoginUser: '',
  errorLoginUser: '', 

  dataAllAgent:   [],
  isErrorAllAgent: false,
  isSuccessAllAgent: false,
  isLoadingAllAgent: false, 
  messageAllAgent: '',
  errorAllAgent: '', 

  resetPassworddata:   [],
  resetPasswordisError: false,
  resetPasswordisSuccess: false,
  resetPasswordisLoading: false, 
  resetPasswordmessage: '', 

  edituserdata:   [],
  edituserisError: false,
  edituserisSuccess: false,
  edituserisLoading: false, 
  editusermessage: '', 

  getsupervisorsdata:   [],
  getsupervisorsisError: false,
  getsupervisorsisSuccess: false,
  getsupervisorsisLoading: false, 
  getsupervisorsmessage: '', 

  rolesdata:   [],
  rolesisError: false,
  rolesisSuccess: false,
  rolesisLoading: false, 
  rolesmessage: '', 

  getTeammembersdata:   [],
  getTeammembersisError: false,
  getTeammembersisSuccess: false,
  getTeammembersisLoading: false, 
  getTeammembersmessage: '', 
}

 

// Registration User
export const userRegistration = createAsyncThunk('register/userRegistration', async ( value,thunkAPI) => {
  try { 
    return await registrationService.userRegistration(value)
  } catch (error:any) {
    const message =
      error.response &&
        error.response.data ?
        error.response.data.errors[0].message :
        error.message  
    return thunkAPI.rejectWithValue(message)
  }
})
 
 
// Registration User
export const getallReguser = createAsyncThunk('register/getallReguser', async (  data,thunkAPI) => {
  try { 
    return await registrationService.getallReguser()
  } catch (error:any) {
    const message =
      error.response &&
        error.response.data ?
        error?.response?.data?.errors[0]?.message :
        error?.message  
    
    return thunkAPI.rejectWithValue(message)
  }
})

// Get All Roles 
export const getallRoles = createAsyncThunk('register/getallRoles', async (  data,thunkAPI) => {
  try { 
    return await registrationService.getallRoles()
  } catch (error:any) {
    const message =
      error.response &&
        error.response.data ?
        error?.response?.data?.errors[0]?.message :
        error?.message  
    
    return thunkAPI.rejectWithValue(message)
  }
})
 

// Get Login User
export const getLoginUser = createAsyncThunk('register/getLoginUser', async (  data,thunkAPI) => {
  try { 
    return await registrationService.getLoginUser(  )
  } catch (error:any) {
    const message =
      error.response &&
        error.response.data ?
        error?.response?.data?.errors[0]?.message :
        error?.message  
    
    return thunkAPI.rejectWithValue(message)
  }
})
// Get user by Agent role
export const getUserProfileById = createAsyncThunk('register/getUserProfileById', async (  data,thunkAPI) => {
  try { 
    return await registrationService.getUserProfileById( data )
  } catch (error:any) {
    const message =
      error.response &&
        error.response.data ?
        error?.response?.data?.errors[0]?.message :
        error?.message  
    
    return thunkAPI.rejectWithValue(message)
  }
})
 
// Reset Password
export const adminResetPassword = createAsyncThunk('register/adminResetPassword', async (  data,thunkAPI) => {
  try { 
    return await registrationService.adminResetPassword( data )
  } catch (error:any) {
    const message =
      error.response &&
        error.response.data ?
        error?.response?.data?.errors[0]?.message :
        error?.message  
    
    return thunkAPI.rejectWithValue(message)
  }
})

// edituser
export const edituser = createAsyncThunk('register/edituser', async (  data,thunkAPI) => {
  try { 
    return await registrationService.edituser( data )
  } catch (error:any) {
    const message =
      error.response &&
        error.response.data ?
        error?.response?.data?.errors[0]?.message :
        error?.message  
    
    return thunkAPI.rejectWithValue(message)
  }
})

// Get Supervisors
export const getsupervisors = createAsyncThunk('register/getsupervisors', async (  data,thunkAPI) => {
  try { 
    return await registrationService.getsupervisors(  )
  } catch (error:any) {
    const message =
      error.response &&
        error.response.data ?
        error?.response?.data?.errors[0]?.message :
        error?.message  
    
    return thunkAPI.rejectWithValue(message)
  }
})
 
// Get Team members
export const getTeammembers = createAsyncThunk('register/getTeammembers', async (  data,thunkAPI) => {
  try { 
    return await registrationService.getTeammembers(data)
  } catch (error:any) {
    const message =
      error.response &&
        error.response.data ?
        error?.response?.data?.errors[0]?.message :
        error?.message  
    
    return thunkAPI.rejectWithValue(message)
  }
})
 



export const registrationSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    reset: (state) => {  
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''  

      state.isLoadingAll = false
      state.isSuccessAll = false
      state.isErrorAll = false
      state.messageAll = ''  
      
      state.isLoadingLoginUser = false
      state.isSuccessLoginUser = false
      state.isErrorLoginUser = false
      state.messageLoginUser = ''  

      state.isLoadingAllAgent = false
      state.isSuccessAllAgent = false  
      state.isErrorAllAgent = false
      state.messageAllAgent = ''
      
      state.resetPasswordisLoading = false
      state.resetPasswordisSuccess = false  
      state.resetPasswordisError = false
      state.resetPasswordmessage = ''
      
      state.edituserisLoading = false
      state.edituserisSuccess = false  
      state.edituserisError = false
      state.editusermessage = ''
      
      state.getsupervisorsisLoading = false
      state.getsupervisorsisSuccess = false  
      state.getsupervisorsisError = false
      state.getsupervisorsmessage = ''
      
      state.rolesisLoading = false
      state.rolesisSuccess = false  
      state.rolesisError = false
      state.rolesmessage = ''
      
      state.getTeammembersisLoading = false
      state.getTeammembersisSuccess = false  
      state.getTeammembersisError = false
      state.getTeammembersmessage= ''
      
    },
    
     
  },
  extraReducers: (builder) => {
    builder  
    .addCase(userRegistration.pending, (state) => {
        state.isLoading = true 
      })
      .addCase(userRegistration.fulfilled, (state:any, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload 
      })
      .addCase(userRegistration.rejected, (state:any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = [] 
      })
      

    .addCase(getallReguser.pending, (state) => {
        state.isLoadingAll = true 
      })
      .addCase(getallReguser.fulfilled, (state:any, action) => {
        state.isLoadingAll = false
        state.isSuccessAll = true
        state.dataAll = action.payload?.data 
      })
      .addCase(getallReguser.rejected, (state:any, action) => {
        state.isLoadingAll = false
        state.isErrorAll = true
        state.messageAll = action.payload
        state.dataAll = [] 
      })

    .addCase(getallRoles.pending, (state) => {
        state.rolesisLoading = true 
      })
      .addCase(getallRoles.fulfilled, (state:any, action) => {
        state.rolesisLoading = false
        state.rolesisSuccess = true
        state.rolesdata = action.payload 
      })
      .addCase(getallRoles.rejected, (state:any, action) => {
        state.rolesisLoading = false
        state.rolesisError = true
        state.rolesmessage = action.payload
        state.rolesdata = [] 
      })

    .addCase(getLoginUser.pending, (state) => {
        state.isLoadingLoginUser = true 
      })
      .addCase(getLoginUser.fulfilled, (state:any, action) => {
        state.isLoadingLoginUser = false
        state.isSuccessLoginUser = true
        state.dataLoginUser = action.payload 
      })
      .addCase(getLoginUser.rejected, (state:any, action) => {
        state.isLoadingLoginUser = false
        state.isErrorLoginUser = true
        state.messageLoginUser = action.payload
        state.dataLoginUser = [] 
      })

    .addCase(getUserProfileById.pending, (state) => {
        state.isLoadingAllAgent = true 
      })
      .addCase(getUserProfileById.fulfilled, (state:any, action) => {
        state.isLoadingAllAgent = false
        state.isSuccessAllAgent = true
        state.dataAllAgent = action.payload 
      })
      .addCase(getUserProfileById.rejected, (state:any, action) => {
        state.isLoadingAllAgent = false
        state.isErrorAllAgent = true
        state.isSuccessAllAgent = action.payload
        state.dataAllAgent = [] 
      })

    .addCase(adminResetPassword.pending, (state) => {
        state.resetPasswordisLoading = true 
      })
      .addCase(adminResetPassword.fulfilled, (state:any, action) => {
        state.resetPasswordisLoading = false
        state.resetPasswordisSuccess = true
        state.resetPassworddata = action.payload 
      })
      .addCase(adminResetPassword.rejected, (state:any, action) => {
        state.resetPasswordisLoading = false
        state.resetPasswordisError = true
        state.resetPasswordmessage = action.payload
        state.resetPassworddata = [] 
      })


    .addCase(edituser.pending, (state) => {
        state.edituserisLoading = true 
      })
      .addCase(edituser.fulfilled, (state:any, action) => {
        state.edituserisLoading = false
        state.edituserisSuccess = true
        state.edituserdata = action.payload 
      })
      .addCase(edituser.rejected, (state:any, action) => {
        state.edituserisLoading = false
        state.edituserisError = true
        state.editusermessage = action.payload
        state.edituserdata = [] 
      })

    .addCase(getsupervisors.pending, (state) => {
        state.getsupervisorsisLoading = true 
      })
      .addCase(getsupervisors.fulfilled, (state:any, action) => {
        state.getsupervisorsisLoading = false
        state.getsupervisorsisSuccess = true
        state.getsupervisorsdata = action.payload 
      })
      .addCase(getsupervisors.rejected, (state:any, action) => {
        state.getsupervisorsisLoading = false
        state.getsupervisorsisError = true
        state.getsupervisorsmessage = action.payload
        state.getsupervisorsdata = [] 
      })

    .addCase(getTeammembers.pending, (state) => {
        state.getTeammembersisLoading = true 
      })
      .addCase(getTeammembers.fulfilled, (state:any, action) => {
        state.getTeammembersisLoading = false
        state.getTeammembersisSuccess = true
        state.getTeammembersdata = action.payload 
      })
      .addCase(getTeammembers.rejected, (state:any, action) => {
        state.getTeammembersisLoading = false
        state.getTeammembersisError = true
        state.getTeammembersmessage = action.payload
        state.getTeammembersdata = [] 
      })
      
  },
})

export const { reset } = registrationSlice.actions
export default registrationSlice.reducer