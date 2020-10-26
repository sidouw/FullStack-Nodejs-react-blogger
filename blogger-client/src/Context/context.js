import React,{createContext,useEffect,useState} from 'react'
import axios from 'axios'
const context = createContext(null)

const UserProvider = ({children})=>{
    const  [user,setUser]= useState(false)
    const [loading,setloading] = useState(true)
    useEffect(()=>{
        axios.get('/users').then(data=>{
            if (data.data) {
                setUser(data.data)
            }
            setloading(false)
        })
    },[])
    return(
        loading ?
        <p>Loading ......</p>
        :
        <context.Provider value= {{user,setUser}}>
        {children}
        </context.Provider>
    )
}
UserProvider.context = context;
export default UserProvider 