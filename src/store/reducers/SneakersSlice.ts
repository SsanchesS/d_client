import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {ISneakersState,ISneaker,IMethods} from "../../types/types"

const initialState:ISneakersState = {
   sneakers: [], // все кросы на сервере
   overlaySwitch: false, // открыта ли корзина
   methods: {
      delivery_methods: [],
      payment_methods:[]
   },
   sneakers_basket: []
}
const SneakersSlice = createSlice({
   name:"SneakersSlice",
   initialState,
   reducers:{
      setSneakers:(state,action:PayloadAction<ISneaker[] | []>)=>{
         // сохраняем после перезагрузки
         state.sneakers = action.payload
      },
      overlaySwitch:(state,action:PayloadAction<boolean>)=>{
         state.overlaySwitch = action.payload
      },
      setMethods:(state,action:PayloadAction<IMethods>)=>{
         state.methods=action.payload
      },
      setSneakers_basket:(state,action:PayloadAction<number[] | []>)=>{
         state.sneakers_basket=action.payload
      },
   }
})
export default SneakersSlice.reducer
export const {setSneakers,overlaySwitch,setMethods,setSneakers_basket} = SneakersSlice.actions