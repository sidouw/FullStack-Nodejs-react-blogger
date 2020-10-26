import React,{useState,useEffect,useMemo} from 'react'
import axios from 'axios'
import PostsMasonary from './PostsMasonary'
import PostsFilter from './PostsFilter'
import PageSelector from './PageSelector'

const postsPerPage = 9

 const Blogs = ()=>{
    const [allPosts,setAllPosts] = useState([])
    const [filters,setFilters] = useState({})
    const [pagePosts,setPagePosts] = useState([])
    const [page,setPage] = useState(1)

    const filterPosts = ()=>{
        if (!filters) return allPosts
        const filtred = allPosts.filter((post)=>{
            return post.title.toLowerCase().includes(filters.title.toLowerCase()) && post.category.includes(filters.category) 
        })
        return  filters.sortByDate ? filtred : filtred.reverse()

    }
    useEffect(()=>{
        axios.get('/posts/allposts').then((data)=>{
            const t = [...data.data]
            setAllPosts([...t])
            setPagePosts(t.slice(0,postsPerPage))
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    useMemo (()=>{
        const lastindex = page * postsPerPage
        const firstIndex = lastindex - postsPerPage
        setPagePosts(filterPosts().slice(firstIndex,lastindex))
    },[page,filters])

    useEffect(()=>{
        window.scroll({
            top:10,
            left:0,
            behavior :"smooth"
        })
    },[page])



    return(
        <div className = "row">
            <div className = 'blogs'>
                <h1>Blogs</h1>
                <PostsFilter onChange ={setFilters}/>
                <PostsMasonary posts = {pagePosts} colums= {3} tagsOnTop={true}/>
                <PageSelector page={page} setPage= {setPage} MaxPages={Math.ceil(filterPosts().length/postsPerPage)}/>
            </div>
            
        </div>
    )
}

export default Blogs