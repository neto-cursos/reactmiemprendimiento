import Cookies from 'js-cookie'
import cookie from 'cookie'
import { useLocation, Navigate,useNavigate } from "react-router-dom";

const LogIn=()=>{
    let navigate = useNavigate();
    Cookies.set('ticket_management_is_user_logged_in', true, {expires: 86400, sameSite: 'lax'})
    return navigate("/")
}

export default LogIn;