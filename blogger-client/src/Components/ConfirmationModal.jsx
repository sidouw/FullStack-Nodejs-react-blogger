import React from 'react';
import Modal from 'react-modal' 



export default ({children,setOpened,opened,Handleconfirm})=>(
    <Modal
    isOpen ={opened}
    contentLabel ="Selected Option"
    onRequestClose = {()=>setOpened(!opened)}
    appElement={document.getElementById('root')}
    className ='confirmation-modal'
    closeTimeoutMS ={200}
    >
        
            <form className ='confirmation-modal__form'>
                <p> {children}</p>
                <div className ='confirmation-modal__form__btns'>
                    <button type ='button' onClick={Handleconfirm} >Confirm</button>
                    <button type ='button' onClick ={()=>setOpened(!opened)}>Cancel</button>
                </div>
            </form>


    </Modal>
)