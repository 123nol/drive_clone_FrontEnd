import React from 'react'
import File from './File'

const ContentList = ({chosenFiles,folders}) => {
  return (
    <div style={{width:"100vw",height:"90vh", display:"flex", flexDirection:"column", alignItems:"center",paddingTop:"30px", overflow:"hidden"}}>
     {/* added a filter for the shit the user searches for in the search bar */}
    {chosenFiles?.map((file,index)=><File key={index} data={file} folders={folders} />)} 
     

    </div>
  )
}

export default ContentList