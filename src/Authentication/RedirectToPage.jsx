import { useNavigate, useLocation, Navigate } from 'react-router-dom';

import React from 'react';

const RedirectToPage = ({pageAdress}) => {
    let location = useLocation();
    //let navigation=useNavigate();
    return (<Navigate to={pageAdress} state={{ from: location }} replace />);
    //return navigation("/")
    
}

export default RedirectToPage;

/*export default function redirectTo(destination, {res, status} = {}) {
    if (res) {
        res.writeHead(status || 302, {Location: destination})
        res.end()
    } else {
        if (destination[0] === '/' && destination[1] !== '/') {
            return <Navigate to={destination} />
        } else {
            window.location = destination
        }
    }
}*/