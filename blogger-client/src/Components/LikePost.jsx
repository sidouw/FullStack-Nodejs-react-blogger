import React, { useState,useContext,useEffect} from 'react';
import axios from 'axios'
import UserProvider from '../Context/context'
export default ({post})=>{
    const [liked,setLiked]= useState(false)
    const {user} = useContext(UserProvider.context)

    useEffect (()=>{
       setLiked( post.like_user_id.includes(user.uid))
    },[])
    const handleLike = ()=>{
        axios.put('/posts/like',{
            uid:user.uid,
            pid:post.pid,
            liked:liked
        }).then((data)=>{
            // console.log(data.data);
            setLiked(!liked)
        }).catch((err)=>{
            console.log(err);
        })
    }
    return (
        <div className='Like-Post'>
            {user && <a onClick = {handleLike}>{liked ? 'Dislike' :'Like'}</a>}
        </div>
        
    )
}