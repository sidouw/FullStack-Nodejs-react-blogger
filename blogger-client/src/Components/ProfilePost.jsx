import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import ConfirmationModal from './ConfirmationModal'

export default ({post,DeletePost})=>{

    const [isOpen,setIsOpen]= useState(false)

    const handleConfirmation =() =>{
        DeletePost(post.pid)
        setIsOpen(false)
    }

return(

    <div className= 'profile-post'>
        <p >{post.title}</p>
        <Link to ={'post/'+post.pid}>Visit</Link>
        <Link to ={'edit/'+post.pid}>Edit</Link>
        <span onClick= {()=> setIsOpen(true)} >Delete</span>
        <ConfirmationModal
            Handleconfirm={handleConfirmation}
            opened = {isOpen} 
            setOpened = {setIsOpen}>Delete Post ?</ConfirmationModal>
    </div>

)
}