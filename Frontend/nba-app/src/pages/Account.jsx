import {LoginForm} from "../components/LoginForm"
import { useState, useEffect } from 'react'
import '../App.css'

function Account({isLoggedIn, setIsLoggedIn}){

    function Login (){
        //db call to check if username/pw exist
        //if passwords match then set useState
        setIsLoggedIn(true)
        console.log(isLoggedIn)
        
    }

    return (
        <>
            <div>test</div>
            {(!isLoggedIn&& 
            <>
               <LoginForm Login={Login}/>
            </>
            )}
        </>
    )

}

export default Account