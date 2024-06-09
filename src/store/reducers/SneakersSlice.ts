import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {ISneakersState,ISneaker,IMethod} from "../../types/types"

const initialState:ISneakersState = {
   sneakers: null, // все кросы на сервере
   overlaySwitch: false, // открыта ли корзина
   methods: null
}
const SneakersSlice = createSlice({
   name:"SneakersSlice",
   initialState,
   reducers:{
      setSneakers:(state,action:PayloadAction<ISneaker[]>)=>{
         // сохраняем после перезагрузки
         state.sneakers = action.payload
      },
      overlaySwitch:(state,action:PayloadAction<boolean>)=>{
         state.overlaySwitch = action.payload
      },
      setMethods:(state,action:PayloadAction<IMethod>)=>{
         state.methods = action.payload
      }
   }
})
export default SneakersSlice.reducer
export const {setSneakers,overlaySwitch,setMethods} = SneakersSlice.actions