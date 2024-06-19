import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {IUser} from "../../types/types"

const initialState:IUser = {
   id: 0,
   f_name: "",
   s_name: "",
   email: "",
   password: "",
   role_id: 1
}
const UserSlice = createSlice({
   name:"UserSlice",
   initialState,
   reducers:{
      // getUser:(state)=>{
      //    return state
      // },
      setUser:(state,action:PayloadAction<IUser>)=>{
         // сохраняем после перезагрузки
         
         return {
            ...state,
            ...action.payload,
         };
      },
   }
})
export default UserSlice.reducer
export const {setUser} = UserSlice.actions