import React,{useState} from 'react';
import ConfirmationModal from './ConfirmationModal'



export default ({comment,isOwner,deletecomment})=>{

   const [isOpen,setIsOpen]= useState(false)

    const handleConfirmation =()=>{
        deletecomment(comment.cid)
        setIsOpen(false)
    }
return (

    <div className = 'post-comments__comment'>
        {isOwner && <button className = 'post-comments__comment__deletebtn' onClick = {()=> setIsOpen(true)}>X</button>}
        <span className = 'post-comments__comment__author'> <span>{comment.author}</span> says:</span>
        <span className = 'post-comments__comment__date'>{comment.date_created.split('T')[0]} </span>
        <p className = 'post-comments__comment__body'>{comment.comment}</p>
        <ConfirmationModal
         Handleconfirm={handleConfirmation}
         opened = {isOpen} 
         setOpened = {setIsOpen}>Discard Post ?</ConfirmationModal>

    </div>
    )
}