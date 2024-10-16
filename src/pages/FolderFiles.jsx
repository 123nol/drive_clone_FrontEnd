import React from 'react'
import File from '../components/File'

const FolderFiles = ({folderFiles,folders,user}) => {
  return (
    <div style={{width:"100vw",height:"90vh", display:"flex", flexDirection:"column", alignItems:"center",paddingTop:"30px", overflow:"hidden"}}>
     
    {folderFiles?.map((file,index)=><File key={index} data={file} folders={folders} user={user}/>)} 
     

    </div>
  )
}

export default FolderFiles