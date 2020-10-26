import React from 'react';



export default ({children})=>(
    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div> <span>{children}</span>  </div>
)