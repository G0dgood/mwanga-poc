import { configureStore } from '@reduxjs/toolkit'     
import navSlice from '../features/SideNav/navSlice'
import authSlice from '../features/Auth/authSlice'
import lobReducer from '../features/Lob/LobSlice'
import registrationSlice from '../features/Registration/registrationSlice'  
import customerSlice from '../features/Customer/customerSlice'
 
 
 
 
 
  
export const store = configureStore({
  reducer: { 
    nav: navSlice,
    lob: lobReducer,
    auth: authSlice, 
    reg: registrationSlice, 
   customer: customerSlice, 
  },
})


// Subscribe to state changes and save the LOB state to local storage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("mwangaCurrentLob", JSON.stringify(state.lob.currentLob));
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch