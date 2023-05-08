import React, { useEffect, useState } from 'react'
import ReactDOM from "react-dom";
import {PlayerTable} from "./PlayerTable"
import {
    useMatch,
    useResolvedPath,
    Link,
  } from "react-router-dom";

export const Navbar = () => {
   
    return (
        <div className="navbarContainer">
            <ul>      
                <CustomLink to="/">Home</CustomLink>
                <CustomLink to="/account">Account</CustomLink>
            </ul>

        </div>
     
    )

    function CustomLink({to,children,...props}){
        const resolvedPath = useResolvedPath(to)
        const isActive = useMatch({path: resolvedPath.pathname, end:true })

        return(
            <li className={isActive? "active" : ""}>
                <Link to={to} {...props}>
                    {children}
                </Link>

            </li>
        )
    }

}