import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
 
  
const initialState = { 

  userInfo:null,
  isError: false,
  isSuccess: false,
  isLoading: false, 
  message: '', 

  data:   [],
  isErrorinput: false,
  isSuccessinput: false,
  isLoadinginput: false, 
  messageinput: '', 

  userprofiledata:   [],
  userprofileisError: false,
  userprofileisSuccess: false,
  userprofileisLoading: false, 
  userprofilemessage: '', 

  dataID:   [],
  isErrorID: false,
  isSuccessID: false,
  isLoadingID: false, 
  messageID: '', 
  
  isErrorlogout: false,
  isSuccesslogout: false,
  isLoadinglogout: false, 
  messagelogout: '', 

  forgetisError: false,
  forgetisSuccess: false,
  forgetisLoading: false, 
  forgetmessage: '', 

  resetisError: false,
  resetisSuccess: false,
  resetisLoading: false, 
  resetmessage: '', 
  
  profileisError: false,
  profileisSuccess: false,
  profileisLoading: false, 
  profilemessage: '', 

  currentisError: false,
  currentisSuccess: false,
  currentisLoading: false, 
  currentmessage: '', 

  supervisorUserisError: false,
  supervisorUserisSuccess: false,
  supervisorUserisLoading: false, 
  supervisorUsermessage: '', 

  adupdateisError: false,
  adupdateisSuccess: false,
  adupdateisLoading: false, 
  adupdatemessage: '', 

  adminresetisError: false,
  adminresetisSuccess: false,
  adminresetisLoading: false, 
  adminresetmessage: '', 
 
}
 

// Login user
export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    return await authService.login(data)

  } catch (error: any) {   
   const message =
      (error.response && 
        error.response.data && 
        error.response.data.message) ||
      error.message ||
      error.toString() 
    return thunkAPI.rejectWithValue(message)
  }
})

 
//Get User Profile Id
export const getUserProfileId = createAsyncThunk('auth/getUserProfileId', async (  data,thunkAPI) => {
  try {
    return await authService.getUserProfileId(data)
  } catch (error:any) {
    const message =
      (error.response && 
        error.response.data && 
        error.response.data.message) ||
      error.message ||
      error.toString() 
     return thunkAPI.rejectWithValue(message)
  }
})


// logout
export const logout = createAsyncThunk('auth/logout', async (data, thunkAPI) => { 
    try {
    return await authService.logout()
  } catch (error:any) {
  const message = (error.response && 
        error.response.data && 
        error.response.data.message) || error.response.data.errors[0].message
      error.message ||
      error.toString()  
     return thunkAPI.rejectWithValue(message)
  }
})

// Forget Password
export const forgetPassword = createAsyncThunk('auth/forgetPassword', async (data, thunkAPI) => { 
    try {
    return await authService.forgetPassword(data)
  } catch (error:any) {
    const message =
      (error.response && 
        error.response.data && 
        error.response.data.message) ||
      error.message ||
      error.toString() 
     return thunkAPI.rejectWithValue(message)
  }
})


// Update Password
export const updatePassword = createAsyncThunk('auth/updatePassword', async (data, thunkAPI) => { 
    try {
    return await authService.updatePassword(data)
    } catch (error: any) { 
    const message = error.response.data.message.toString() 
     return thunkAPI.rejectWithValue(message)
  }
})

// Update Profile
export const updateProfile = createAsyncThunk('auth/updateProfile', async (data, thunkAPI) => { 
    try {
    return await authService.updateProfile(data)
  } catch (error:any) {
    const message =
      (error.response && 
        error.response.data && 
        error.response.data.message) ||
      error.message ||
      error.toString() 
     return thunkAPI.rejectWithValue(message)
  }
})

// Current User
export const currentUser = createAsyncThunk('auth/currentUser', async (data, thunkAPI) => { 
    try {
    return await authService.currentUser( )
  } catch (error:any) {
    const message =
      (error.response && 
        error.response.data && 
        error.response.data.message) ||
      error.message ||
      error.toString() 
     return thunkAPI.rejectWithValue(message)
  }
})

// Supervisor User
export const supervisorUser = createAsyncThunk('auth/supervisorUser', async (data, thunkAPI) => { 
    try {
    return await authService.supervisorUser(data )
  } catch (error:any) {
    const message =
      (error.response && 
        error.response.data && 
        error.response.data.message) ||
      error.message ||
      error.toString() 
     return thunkAPI.rejectWithValue(message)
  }
})
// User profile
export const userprofile = createAsyncThunk('auth/userprofile', async (data, thunkAPI) => { 
    try {
    return await authService.userprofile( )
  } catch (error:any) {
    const message =
      (error.response && 
        error.response.data && 
        error.response.data.message) ||
      error.message ||
      error.toString() 
     return thunkAPI.rejectWithValue(message)
  }
})
export const adminupdateprofile = createAsyncThunk('auth/adminupdateprofile', async (data, thunkAPI) => { 
    try {
    return await authService.adminupdateprofile( data)
  } catch (error:any) {
    const message =
      (error.response && 
        error.response.data && 
        error.response.data.message) ||
      error.message ||
      error.toString() 
     return thunkAPI.rejectWithValue(message)
  }
})
export const adminupdatePassword = createAsyncThunk('auth/adminupdatePassword', async (data, thunkAPI) => { 
    try {
    return await authService.adminupdatePassword( data)
  } catch (error:any) {
    const message =
      (error.response && 
        error.response.data && 
        error.response.data.message) ||
      error.message ||
      error.toString() 
     return thunkAPI.rejectWithValue(message)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {    
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = '' 

      state.isLoadinginput = false
      state.isSuccessinput = false
      state.isErrorinput = false
      state.messageinput = '' 

      state.profileisLoading= false
      state.profileisSuccess= false
      state.profileisError= false
      state.profilemessage= '' 

      state.isLoadingID = false
      state.isSuccessID = false
      state.isErrorID = false
      state.messageID = '' 

      state.isLoadinglogout = false
      state.isSuccesslogout = false
      state.isErrorlogout = false
      state.messagelogout = ''  

      state.forgetisLoading = false
      state.forgetisSuccess = false
      state.forgetisError = false
      state.forgetmessage = ''  

      state.resetisLoading = false
      state.resetisSuccess = false
      state.resetisError = false
      state.resetmessage = ''  

      state.userprofileisLoading = false
      state.userprofileisSuccess = false
      state.userprofileisError = false
      state.userprofilemessage = ''  

      state.currentisLoading = false
      state.currentisSuccess = false
      state.currentisError = false
      state.currentmessage = ''  

      state.supervisorUserisLoading = false
      state.supervisorUserisSuccess = false
      state.supervisorUserisError = false
      state.supervisorUsermessage = ''  

      state.adupdateisLoading = false
      state.adupdateisSuccess = false
      state.adupdateisError = false
      state.adupdatemessage = ''  

      state.adminresetisLoading = false
      state.adminresetisSuccess = false
      state.adminresetisError = false
      state.adminresetmessage = ''  

     

    }
  },

  extraReducers: (builder) => {
    builder 
      //  Login
      .addCase(login.pending, (state) => {
        state.isLoading = true 
      }) 
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userInfo = action.payload 
      }) 
      .addCase(login.rejected, (state:any, action) => {
        state.isLoading  = false
        state.isError  = true
        state.message  = action.payload
        state.data  = [] 
      })

      // Logout
      .addCase(logout.pending, (state:any, action) => {
        state.isLoadinglogout = true
        state.isErrorlogout = false  
      }) 
      .addCase(logout.fulfilled, (state) => { 
        state.isLoadinglogout = false 
        state.isSuccesslogout = true
      }) 
     .addCase(logout.rejected, (state:any, action) => { 
        state.isLoadinglogout  = false
        state.isErrorlogout  = true
        state.messagelogout  = action.payload
       state.datalogout = [] 
     })
      
// get User Profile Id
      .addCase(getUserProfileId.pending, (state:any, action) => {
        state.isLoadingID = true
        state.isErrorID = false  
      }) 
      .addCase(getUserProfileId.fulfilled, (state ,action) => {
             state.isLoadingID = false
        state.isSuccessID = true
        state.dataID = action.payload 
      }) 
     .addCase(getUserProfileId.rejected, (state:any, action) => {
        state.isLoadingID  = false
        state.isErrorID  = true
        state.messageID  = action.payload
        state.dataID  = [] 
     })
      
 
      // Forget Password
      .addCase(forgetPassword.pending, (state) => {
        state.forgetisLoading = true 
      })
      .addCase(forgetPassword.fulfilled, (state:any, action) => {
        state.forgetisLoading = false
        state.forgetisSuccess = true
        state.forgetdata = action.payload 
      })
      .addCase(forgetPassword.rejected, (state:any, action) => {
        state.forgetisLoading = false
        state.forgetisError = true
        state.forgetmessage = action.payload
        state.forgetdata = [] 
      })  

      // Reset Password
      .addCase(updatePassword.pending, (state) => {
        state.resetisLoading = true 
      })
      .addCase(updatePassword.fulfilled, (state:any, action) => {
        state.resetisLoading = false
        state.resetisSuccess = true
        state.resetdata = action.payload 
      })
      .addCase(updatePassword.rejected, (state:any, action) => {
        state.resetisLoading = false
        state.resetisError = true
        state.resetmessage = action.payload
        state.resetdata = [] 
      })  

      // Update Profile
      .addCase(userprofile.pending, (state) => {
        state.userprofileisLoading = true 
      })
      .addCase(userprofile.fulfilled, (state:any, action) => {
        state.userprofileisLoading = false
        state.userprofileisSuccess = true
        state.userprofiledata = action.payload 
      })
      .addCase(userprofile.rejected, (state:any, action) => {
        state.userprofileisLoading = false
        state.userprofileisError = true
        state.userprofilemessage = action.payload
        state.userprofiledata = [] 
      })  
      // Update Profile
      .addCase(adminupdateprofile.pending, (state) => {
        state.adupdateisLoading = true 
      })
      .addCase(adminupdateprofile.fulfilled, (state:any, action) => {
        state.adupdateisLoading = false
        state.adupdateisSuccess = true
        state.adupdatedata = action.payload 
      })
      .addCase(adminupdateprofile.rejected, (state:any, action) => {
        state.adupdateisLoading = false
        state.adupdateisError = true
        state.adupdatemessage = action.payload
        state.adupdatedata = [] 
      })  
      // Update Profile
      .addCase(adminupdatePassword.pending, (state) => {
        state.adminresetisLoading = true 
      })
      .addCase(adminupdatePassword.fulfilled, (state:any, action) => {
        state.adminresetisLoading = false
        state.adminresetisSuccess = true
        state.adminresetdatas = action.payload 
      })
      .addCase(adminupdatePassword.rejected, (state:any, action) => {
        state.adminresetisLoading = false
        state.adminresetisError = true
        state.adminresetmessage = action.payload
        state.adminresetdata = [] 
      })  

      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.profileisLoading = true 
      })
      .addCase(updateProfile.fulfilled, (state:any, action) => {
        state.profileisLoading = false
        state.profileisSuccess = true
        state.profiledata = action.payload 
      })
      .addCase(updateProfile.rejected, (state:any, action) => {
        state.profileisLoading = false
        state.profileisError = true
        state.profilemessage = action.payload
        state.profiledata = [] 
      })  

      
      // Current User
      .addCase(currentUser.pending, (state) => {
        state.currentisLoading = true 
      })
      .addCase(currentUser.fulfilled, (state:any, action) => {
        state.currentisLoading = false
        state.currentisSuccess = true
        state.currentdata = action.payload 
      })
      .addCase(currentUser.rejected, (state:any, action) => {
        state.currentisLoading = false
        state.currentisError = true
        state.currentmessage = action.payload
        state.currentdata = [] 
      })  

      // Supervisor User
      .addCase(supervisorUser.pending, (state) => {
        state.supervisorUserisLoading = true 
      })
      .addCase(supervisorUser.fulfilled, (state:any, action) => {
        state.supervisorUserisLoading = false
        state.supervisorUserisSuccess = true
        state.supervisorUserdata = action.payload 
      })
      .addCase(supervisorUser.rejected, (state:any, action) => {
        state.supervisorUserisLoading = false
        state.supervisorUserisError = true
        state.supervisorUsermessage = action.payload
        state.supervisorUserdata = [] 
      })  
      
  },
})

export const { reset  } = authSlice.actions
export default authSlice.reducer