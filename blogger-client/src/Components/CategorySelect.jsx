import React from 'react';


const Categories = [
    '',
    'Tech',
    'Art',
    'Games',
    'dev'
]

export default ({category,setCategory})=>{

    return (
        <div className ='categoryselect'>
            <span>Category: </span>
            <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                {
                    Categories.map((cat,index)=>{
                        return <option key= {index} value={cat}>{cat}</option>
                    })
                }
            </select>
        </div>
    )
}