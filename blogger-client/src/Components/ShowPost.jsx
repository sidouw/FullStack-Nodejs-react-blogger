import React,{useEffect,useState} from 'react';
import parse from 'html-react-parser';
import axios from 'axios'
import PostCommentForm from './PostCommentForm'
import PostsComments from './PostComments';
import LikePost from './LikePost';
import LoadingSpinner from './LoadingSpinner';


const ShowPost = (props) => {

    const [loading,setLoading] = useState(true)
    const [post,setPost] = useState({})
    const [loadMessage,setLoadMessage] = useState('Loading......')

    useEffect(()=>{
        axios.get('/posts/getpost?pid='+props.match.params.pid)
        .then((data)=>{
            // console.log(data.data)
            setPost(data.data)
            setLoading(false)
        }).catch((err)=>{
            setLoadMessage(404)
            })
    },[props.match.params.pid])

    return (
        <div className = "row">
            { loading ? 
                <h1>{loadMessage=== 404 ? 'Post Not Found !' : <LoadingSpinner/>}</h1>
                :
            <div className = "show-Post">
                {
                    post ?
                    <>
                        <h2 className ="show-Post__title">{post.title}</h2>
                        <div className ="show-Post__info">   
                            <p>Published on: {post.date_created.split('T')[0]}</p>
                            <p>Category: {post.category}</p>
                            <p>likes: {post.like_user_id.length} </p>
                        </div>
                        <div className ="show-Post__body">
                            {parse(post.body)}
                        </div>
                        <PostsComments pid={props.match.params.pid}/>
                        <LikePost post={post} />
                        <PostCommentForm pid={props.match.params.pid}/>
                    </>
                    :
                    <h1>Nothing To Show Here !!</h1>
            }
            </div>}
        </div>
    );
}

export default ShowPost;