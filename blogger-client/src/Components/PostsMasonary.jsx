import React from 'react'
import MasonaryPost from './MasonaryPost'

export default ({posts,colums,tagsOnTop})=>{

    return (
        <section className = 'masonary' style = {{gridTemplateColumns : `repeat(${colums},minmax(275px,1fr))`}}>
        {
            posts.map((post,index)=>
                <MasonaryPost {...{post,index,tagsOnTop,key:index}}/>
            )
        }
        </section>
    )
}
