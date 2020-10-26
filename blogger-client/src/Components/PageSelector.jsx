import React,{useState} from 'react'


export default ({page,setPage,MaxPages})=>{
    const [incEnabled,setIncEnabled] = useState(page===MaxPages)
    const [decEnabled,setDecEnabled] = useState(page>1)
    const incPage = ()=>{
        if (page<MaxPages) {
            setPage(page+1)
            
            setIncEnabled(page+1===MaxPages)
            setDecEnabled(page+1>1)
        }

    }
    const decPage = ()=>{
        if (page>1) {
            setPage(page-1)
            setIncEnabled(page-1===MaxPages)
            setDecEnabled(page-1>1)
        }

    }


    return (
    <div className = 'page-selector'>
        <button onClick = {decPage} disabled = {!decEnabled}>{'<'}</button>
        <span>{page}/{MaxPages}</span>
        <button onClick={incPage} disabled = {incEnabled}>{'>'}</button>
    </div>
)}