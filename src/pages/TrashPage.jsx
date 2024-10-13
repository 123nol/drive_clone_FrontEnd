
import React, { useEffect, useState } from 'react'
import axiosConfig from '../Config/AxiosConfig'
import TrashFile from '../components/TrashFile'

const TrashPage = ({user}) => {
  const [trashFiles,setTrashFiles]=useState([]);

  const fetchTrash=async()=>{
    try{const res=await axiosConfig.get("/home/user/trash");
    setTrashFiles(res.data);
}
catch(err){
  console.log(err);
}
  }

  useEffect(()=>{
    fetchTrash();


  }

  ,[])

  return (
    <>
    <div style={{display:"flex", flexDirection:"column"}}>

<div style={{width:"100vw",height:"90vh", display:"flex", flexDirection:"column", alignItems:"center",paddingTop:"30px", overflow:"hidden"}}>  
{trashFiles?.map((file,index)=><TrashFile key={index} data={file}/>)} 
</div>

</div>

    
    </>
    
    
  )
}

export default TrashPage