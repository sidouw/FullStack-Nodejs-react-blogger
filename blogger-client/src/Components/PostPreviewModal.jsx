import React from 'react'
import Modal from 'react-modal'
import parse from 'html-react-parser';
export default ({preview,setPreview,post})=>{
    

    
    return(

    <Modal
    isOpen ={preview}
    contentLabel ="Selected Option"
    onRequestClose = {()=>setPreview(!preview)}
    appElement={document.getElementById('root')}
    className ="modal container"
    closeTimeoutMS ={200}
    >
        <div className = "row">
            <div className = "show-Post">
                {
                    post ?
                    <>
                    <h2 className ="show-Post__title">{post.title}</h2>
                    <div className ="show-Post__body">
                        {parse(post.body)}
                    </div>
                    </>
                    :
                    <h1>Nothing To Show Here !!</h1>
            }
        </div>
    </div>

    </Modal>

)}

