import React,{useState,useContext} from 'react';
import axios from 'axios'
import UserProvider from '../Context/context'




export default ({pid})=>{
    const [comment,setComment]=useState('')
    const {user} = useContext(UserProvider.context)

    const handleFormSubmit = (e)=>{
        e.preventDefault()
        axios.post('/comments/savecomment',{
            comment:comment,
            user_id:user.uid,
            author : user.username,
            post_id:pid
        }).then((data)=>{
            console.log(data)
            setComment('')
        }).catch((err)=>{
            console.log(err)
            alert('Failed To Post Comment')
        })
    }

    return (
        <div className = 'post-comment-form' >
            { user?       
                <form className = 'post-comment-form__form' onSubmit={handleFormSubmit}>
                    <h2>Leave a Comment</h2>
                    
                    <textarea className = 'post-comment-form__form__textarea' maxLength ='800' value ={comment} onChange={(e)=>setComment(e.currentTarget.value)} />
                    <button>Post comment</button>
                </form>
                :
                <h2>Log in to comment</h2>
            }
        </div>
    )
}