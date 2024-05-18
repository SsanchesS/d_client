import React, {FC} from 'react'
import { useAppSelector } from '../../hooks/hooks'
import s from './NotFoundPage.module.sass'
import { useNavigate } from 'react-router-dom'

const NotFoundPage:FC = () => {
const navigate = useNavigate()
const user = useAppSelector(state=>state.UserReducer)
const Back=()=>{
    user.id ? navigate(`/`,{replace:true}) : navigate("/auth",{replace:true})
}
return (
<div className={s.content}>
    <div className={s.text}>
        <div>
            <div className="mb10px">NotFound 404</div>
            <div className={`button ${s.button}`}><button onClick={Back}>Назад</button></div>
        </div>
    </div>
</div>
)}
export default NotFoundPage