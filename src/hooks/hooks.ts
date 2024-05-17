import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"
import {TypeState,TypeDispatch} from "../store/store"

export const useAppDispatch=()=>useDispatch<TypeDispatch>()
export const useAppSelector: TypedUseSelectorHook<TypeState>=useSelector