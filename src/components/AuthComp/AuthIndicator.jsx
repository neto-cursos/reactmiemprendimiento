import React from 'react'
import api from '../../Authentication/ApiAuth'
import {logOut} from '../../Authentication/UtilsAuth'
import { Link } from 'react-router-dom'

const AuthIndicator = ({isLoggedIn}) => {
    if (! isLoggedIn) {
        return (
            <Link to="/login" 
                className="px-3 py-2 rounded-md text-sm font-medium text-indigo-300 cursor-pointer hover:text-white hover:bg-indigo-700 focus:outline-none focus:text-white focus:bg-indigo-700"
                onClick={() => api().post('/logout').then(() => logOut())}
            >
                Sign Out
            </Link>
        )
    }

    return (
        <Link to="/login" className='px-3 py-2 rounded-md text-sm font-medium text-indigo-300 hover:text-white hover:bg-indigo-700 focus:outline-none focus:text-white focus:bg-indigo-700'>
                Sign In            
        </Link>
    )
}

export default AuthIndicator
