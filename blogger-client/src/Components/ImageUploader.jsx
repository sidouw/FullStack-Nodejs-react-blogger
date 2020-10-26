import React, {useRef,useState,useEffect} from "react";


export default ({children,imageUploaded,image})=>{
    
    const dropArea = useRef(null)
    const types = ['image/png', 'image/jpeg', 'image/gif']
    const [uploadedImage,setUploadedImage] = useState('')
    //foncs


    useEffect(()=>{
      image && setUploadedImage(image)
    },[image])

    //
    const  handleDrop= (e)=> {
        unhighlight(e)
        let dt = e.dataTransfer
        let files = dt.files  
        handleFiles(files)
        
    
    }

    
    const  handleFiles = (files)=> {
        files = [...files]
        const errs =[]
          files.forEach((file, i) => {
      
            if (types.every(type => file.type !== type)) {
              errs.push(`'${file.type}' is not a supported format`)
            }
      
            if (file.size > 10000000) {
              errs.push(`'${file.name}' is too large, please pick a smaller file`)
            }
          })
          
          if (errs.length) {
            return errs.forEach(err => alert(err))
          }

         
        files.forEach(previewFile)
    }

    const  highlight = (e)=> {
        e.preventDefault()
        e.stopPropagation()
        dropArea.current.classList.add('highlight')
    }
    const unhighlight=(e)=> {
        e.preventDefault()
        e.stopPropagation()
        dropArea.current.classList.remove('highlight')
    }
 

    const previewFile = (file)=> {

    let reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onloadend = ()=> {
            setUploadedImage(reader.result)
            imageUploaded && imageUploaded(reader.result)
        }
        
    }


    return (
        <div  className = 'imageUploader'>
            <div onDragEnter={highlight} onDragOver={highlight}  onDragLeave={unhighlight} onDrop={handleDrop}  id="drop-area" ref ={dropArea}
            style = {{backgroundImage : ` url(${uploadedImage}`}}
            >
                {   !uploadedImage && 
                    <>
                    <p>{children}</p>
                    <span>Max File Size 10MB</span>
                    <span>Click to Upload or drop the image</span>
                    </>
                }
                    <input type="file" id="fileElem" accept={types} onChange={e =>handleFiles(Array.from(e.target.files))} />
                <label className="upload-button" htmlFor="fileElem">Select some files</label>
                

             </div>
      
        </div>
    )
}