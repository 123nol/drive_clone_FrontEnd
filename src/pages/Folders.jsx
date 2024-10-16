import React, { useEffect } from 'react'
import Folder from '../components/Folder'

const Folders = ({folders,setFolders,getFolders,getFolderFiles,user}) => {
  useEffect(()=>{
    getFolders();
  },[])
  return (
    <div>
      {folders?.map((folder,index)=> <Folder key={index} data={folder} getFolderFiles={getFolderFiles} user={user}/>)}
    </div>
  )
}

export default Folders