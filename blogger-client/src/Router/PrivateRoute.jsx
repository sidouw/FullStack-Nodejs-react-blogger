import React,{useContext} from 'react'
import {Redirect,Route} from 'react-router-dom'
import UserProvider from '../Context/context'



export default ({component:Component,...rest})=>{
    const {user} = useContext(UserProvider.context)
return (
        <Route {...rest} component = {(props)=>(
            user ?
            <Component {...props} />
            :
            <Redirect to= '/'/ >
             
        )
        }
        />
    )
}

