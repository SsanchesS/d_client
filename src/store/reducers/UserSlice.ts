import { createSlice } from "@reduxjs/toolkit";
import {IUser} from "../../types/types"

const initialState:IUser = {
   id: 0,
   f_name: "",
   s_name: "",
   email: "",
   password: ""
}
const UserSlice = createSlice({
   name:"UserSlice",
   initialState,
   reducers:{
      getUser:()=>{

      },
      setUser:()=>{

      }
   }
})
export default UserSlice.reducer
export const {getUser,setUser} = UserSlice.actions