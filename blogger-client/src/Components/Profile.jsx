import React,{useContext} from 'react';
import UserProvider from '../Context/context'
import ProfileData from './Profileposts'
import history from '../Router/history'
import axios from 'axios'
export default ()=>{
    const {user,setUser} = useContext(UserProvider.context)
    const handleDeleteProfile = ()=>{
        axios.delete('/users/delete?uid='+user.uid).then(()=>{
            setUser(false)
            history.push('/')
        }).catch((err)=>{
            console.log(err);
        })
    }
    return (
        <div className = "row">

            <section className = 'profile'>
                <img src = {user.picture} alt ={user.name}/>
                <h1>{user.username}</h1>
                <p>Joined on : {user.date_created.split('T')[0]}</p>
                <button onClick = {handleDeleteProfile}>Delete Profile</button>
            </section>
            
            {user.author==="true" &&
                <section className ='profile-data'>
                    <div className ='profile-data__comments'>
                        <h2>Posts</h2>
                        <ProfileData/>
                    </div>
                    
                </section>
            }
        </div>
    )
}