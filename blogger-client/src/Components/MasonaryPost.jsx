import React from 'react'
import {Link} from 'react-router-dom'

export default ({post,tagsOnTop})=>{

    const windowWidth = window.innerWidth

    const imageBackGround = {backgroundImage : ` url("${post.picture}")`} 

    // add Grid style based on widonw with for responsiveness
    const style = windowWidth >900 ? {...imageBackGround,...post.style}: imageBackGround

    return (
        <Link className="masonary-post overlay" style={style} to={'post/'+post.pid} >
            <div className = "image-text" style= {{justifyContent : tagsOnTop ? 'space-between' : 'flex-end'}}>
                <div className='tags-container'>
                    <span className='tag' style = {{backgroundColor : '#777'}}>{post.category}</span>
                </div>
                <div>
                    <h2 className='image-title' >{post.title}</h2>
                    <span className = "image-date">{post.date_created.split('T')[0]}</span>
                </div>
            </div>
        </Link>
    )
}
