import React,{useState,useContext,useEffect} from 'react'
import { Editor } from '@tinymce/tinymce-react';
import ImageUploader from './ImageUploader'
import PostPreviewModal from './PostPreviewModal'
import CategorySelect from './CategorySelect'
import LoadingSpinner from './LoadingSpinner'
import history from '../Router/history'
import UserProvider from '../Context/context'
import ConfirmationModal from './ConfirmationModal'
import axios from 'axios'


const editorPlugins = [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount link image Image Tools code autoresize'
]

const editorToolBar = 'undo redo | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image editimage|removeformat | help'





export default (props)=>{
    const [title,setTitle] = useState('')
    const [category,setCategory] = useState('')
    const [postState, setPostState] = useState(false);
    const [body,setBody] = useState('')
    const [loading,setLoading] = useState(true)
    const [postImage,setPostImage] = useState('')
    const [postID,setPostId] = useState('')
    const [preview,setPreview] = useState(false)
    const [saving,setSaving] = useState(false)
    const {user} = useContext(UserProvider.context)
    const [isOpen,setIsOpen]= useState(false)
    const [loadMessage,setLoadMessage] = useState('Loading.....') 


    useEffect(()=>{
        // fetch Post      
        if (props.match.params.pid) {
            axios.get('/posts/getpost?pid='+props.match.params.pid).then((data)=>{
                setPostId(data.data.pid)
                setTitle(data.data.title)
                setCategory(data.data.category)
                setBody(data.data.body)
                setPostImage(data.data.picture)
                setPostState(data.data.published)
                setLoading(false)
            }).catch((err)=>{
                console.log(err);
                setLoadMessage(404)
            })
        }else{
            setLoading(false)
        }
    },[props.match.params.pid])


    const  handleEditChaneg =(data,editor) => {
        setBody(data)
    }
    
    
    const handlePreview = ()=>{
        if(!title.trim())
            return alert('Title Cannot be left Empty')
        if(!body.trim())
            return alert('Article Cannot be left Empty')
        if(!postImage.trim())
            return alert('Thumbnail Cannot be left Empty') 
        setPreview(true)
        
    }  
    
    const handleSave = ()=>{
        
        if(!title.trim())
            return alert('Title Cannot be left Empty')
        if(!body.trim())
            return alert('Article Cannot be left Empty')
        if(!postImage.trim())
            return alert('Thumbnail Cannot be left Empty') 
        
        setSaving(true)
        axios.post('/posts/save',{
            pid : postID,
            body,
            title,
            picture : postImage,
            author : user.username,
            user_id : user.uid,
            category:category,
            published :postState,
            test:'dddd'
        }).then((data)=>{
            console.log(data.data)
            setPostId(data.data.pid)
            setSaving(false)
            
            if (data.data.picture) {
                setPostImage(data.data.picture)
                alert('Post Saved')
            }else{
                alert('post Saved without Thumbnail Try again later')
            }
            
        }).catch((err)=>{
            console.log('err.data')
            setSaving(false)
        })
    }  
    const handleDiscard = ()=>{
        // Add Confirmation
       
        history.push('/')
    }  
   
    const handleImageUpload = (image)=>{
        setPostImage(image)
    }
   
   
    return (
        <div className = "row">
        {
            loading ? 
            <h1>{loadMessage===404 ? 'Post Not Found !' : <LoadingSpinner> Loading... </LoadingSpinner> }</h1>
            :
            <>
            <section className ='post-creation'>

            <h1>{postID ? 'Post edit Page' : 'Post Creation Page'}</h1>
            {saving && <LoadingSpinner> Saving... </LoadingSpinner>}
            <form className = 'post-creation__from'>
                <div className = 'post-creation__from__info'>
                    <div className = 'post-creation__from__info__inputs'>
                            <span>Title</span>
                            <input value={title} onChange = {(e)=>setTitle(e.target.value)}/>
                            <CategorySelect category ={category} setCategory ={setCategory}/>
                            <span>Published: </span>
                            <select value={postState} onChange={(e)=>setPostState(e.target.value)}>
                                <option value={true}>Published</option>
                                <option value={false}>Not Published</option>
                            </select>

                    </div>
                    <ImageUploader imageUploaded ={handleImageUpload} image= {postImage}>Thumbail</ImageUploader>
                </div>
                <h1>Post</h1>
                <Editor
                    initialValue={body}
                    init={{
                    height: 500,
                    menubar: true,
                    plugins: editorPlugins,
                    toolbar: editorToolBar,
                    min_height: 400,
                    width : '100%',
                    mobile: {
                        menubar: true
                      }
                    }}
                    onEditorChange={handleEditChaneg}
                />
                <div className = 'post-creation__from__btns'>
                <button type="button" onClick ={handlePreview} className = 'post-creation__from__btn'>Preview</button>
                <button type="button" onClick ={handleSave} className = 'post-creation__from__btn'>Save</button>
                <button type="button" onClick ={()=>setIsOpen(true)} className = 'post-creation__from__btn'>Discard</button>
                </div>
            </form>
        </section>
            <PostPreviewModal preview ={preview} setPreview = {setPreview} post ={{title,body}}/>
            <ConfirmationModal
                Handleconfirm={handleDiscard}
                opened = {isOpen} 
                setOpened = {setIsOpen}>Delete comment ?</ConfirmationModal>
                </>
        }

        </div>
    )
}



