import React,{useState,useEffect} from 'react';
import CatergorySelect from './CategorySelect'


export default ({onChange})=>{
    const [category,setCategory] = useState('')
    const [textFilter,setTextFilter] = useState('')
    const [sortByDate,setSortByDate] = useState(true)

    useEffect(()=>{
        onChange({
            title:textFilter,
            category,
            sortByDate
        })
    },[category,textFilter,sortByDate])

    const onTextChange = (e)=>{
        setTextFilter(e.currentTarget.value)
    }
    
    return (
        <div className ='posts-filter'>
            <div className ='posts-filter__search'>
                <span>Search</span>
                <input value ={textFilter} onChange = {onTextChange} / >
            </div>
            <CatergorySelect category= {category} setCategory = {setCategory} / >
            <div >
            <button onClick = {()=>setSortByDate(!sortByDate)}>Sort by Date {sortByDate ? '↓' : '↑'}</button>
        
            </div>
        </div>
    )
}