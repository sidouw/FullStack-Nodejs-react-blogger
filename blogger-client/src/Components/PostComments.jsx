import React, { useState, useEffect,useContext } from 'react';
import PostComment from './PostComment'
import axios from 'axios'
import UserProvider from '../Context/context'

export default ({pid})=>{
    const [comments,setComments] = useState([])
    const {user} = useContext(UserProvider.context)

    useEffect(()=>{
        axios.get('/comments/postcomments?pid='+pid).then((data)=>{
            setComments(data.data)
            console.log(data.data)
            console.log(user.uid)
        }).catch((err)=>{
            console.log(err)
        })
    },[pid])
    
    const deletecomment = (cid)=>{
        axios.delete('/comments/deletecomment?cid='+cid+'&uid='+user.uid
        ).then((data)=>{
            setComments(comments.filter((comment)=>{
                return comment.cid !== cid
            }))
        }).catch((err)=>{
            console.log(err);
        })
    }
    return (
        <div className = 'post-comments'>
            <h2>{comments.length} Comments</h2>
            {
                comments.map((comment,index)=>(
                    <PostComment key ={index} comment = {comment} deletecomment={deletecomment} isOwner= {user.uid===comment.user_id}/>
                ))
            }
        </div>
    )
}