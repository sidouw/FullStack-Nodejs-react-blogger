import React,{useEffect,useState} from 'react'
import LoadingSpinner from './LoadingSpinner'
import PostsMasonary from './PostsMasonary'
import MasonaryPost from './MasonaryPost'
import axios from 'axios'

// Fix Resize Issue
const trendingConfig = {
    //selects the center Image
    1 :{
        gridArea : '1 / 2 / 3 / 3'
    }
}
const LatestConfig = {
    0 :{
        gridArea : '1 / 1 / 2 / 3',
        height : '300px'
    },
    1: {
        height : '300px'
    },
    3: {
        height : '630px',
        marginLeft : '30px',
        width:'630px'
    }
}




export default ()=>{
    const [latest,setLatest]= useState([])
    const [trending,setTrending]= useState([])
    //To be Diplayed on the right
    const [lastpost,setLastpost]= useState({})
    const [loading,setloading] = useState(true)
    // latest
    useEffect(()=>{
        axios.get('/posts/latest').then((data)=>{

            const posts = [...data.data]
            
            //add custom styles to posts 
            posts.forEach((post,index) => {
                post.style = LatestConfig[index]
            });
            
            setLastpost(posts.pop())
            setLatest(posts)
            setloading(false)

        }).catch((err)=>{
            console.log(err);
        })
        axios.get('/posts/trending').then((data)=>{
            const posts = [...data.data]
            posts.forEach((post,index) => {
                post.style = trendingConfig[index]
            });
            setTrending(posts)
        }).catch((err)=>{
            console.log(err);
        })


    },[])

    return(
        <div className = "row">
        <section className = 'home'>
            <h1 onClick = {()=>console.log(lastpost)} >Latest Posts</h1>
            
           {loading? <LoadingSpinner> Loading... </LoadingSpinner> : <section className = "featured-posts-container">
                <PostsMasonary posts = {latest} colums={2} tagsOnTop = {true}/>
                {lastpost && <MasonaryPost post = {lastpost} tagsOnTop = {true}/>}
            </section>}
            <h1>Trending Posts</h1>
            <PostsMasonary posts = {trending} colums = {3}/>
        </section>
        </div>
    )
}
