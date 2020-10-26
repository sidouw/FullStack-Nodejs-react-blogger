import React, { useState, useContext,useEffect } from 'react';
import axios from 'axios'
import UserProvider from '../Context/context'
import ProfilePost from './ProfilePost'

export default ()=>{

    // const [loading,setLoading] = useState(true)
    const [posts,setPosts] = useState([])

    const {user} = useContext(UserProvider.context)



    useEffect (()=>{
       
        axios.get('/posts/userposts?uid='+user.uid).then((data)=>{
            // console.log(data.data)
            setPosts(data.data)
            // setLoading(false)
        }).catch((err)=>{
            console.log(err);
        })
        // get the user comments
    },[user.uid])

    const DeletePost = (pid)=>{
        axios.delete('/posts/deletePost?pid='+pid).then((data)=>{
            
        }).catch((err)=>{
            console.log(err);
        })
    }


    return (
        <>
            {
                posts.map((post,index)=>(
                        <ProfilePost key ={index} post= {post} DeletePost= {DeletePost} />
                    ) 
                )
            }
        </>
    )
}