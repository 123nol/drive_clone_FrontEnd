import { useEffect, useState } from "react";
import AuthPage from "./pages/AuthPage";
import Landing from "./pages/Landing";
import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Shared from "./pages/Shared";
import Folders from "./pages/Folders";
import axiosConfig from "./Config/AxiosConfig";
import FolderFiles from "./pages/FolderFiles";


function App() {
  const[logged,setLogged]=useState(false)
  const[token,setToken]=useState("")
  const[files,setFiles]=useState([])
  const[folders,setFolders]=useState([])
  const[folderFiles,setFolderFiles]=useState([])
  // const[searchTerm,setSearchTerm]=useState("")
  const[user,setUser]=useState({})
  // with this, the currnet user will be passed and the components like the file component can check the owner property of the file and if it matches the the email of the user passsed through this state, they can display the owner as " me" instead of the email of the currnet user themselves
  const getFolderFiles=async(folderId)=>{
    try{
       console.log(folderId)
      const res=await axiosConfig.post("/home/user/folder", {"folderId":folderId})
      setFolderFiles(res.data)
    }
    catch(err){
      console.log(err)
    }
  }
  const getUser=async()=>{
    
    try{
      const response= await axiosConfig.get('http://localhost:8080/home/user/curuser')
      setUser(response.data.user)
      console.log(user)
    }
    catch(err){
      console.log(err)
    }

  }
  const getFiles=async()=>{
    try
    {
      const response=await axiosConfig.get("/home/user/alldocs")
      setFiles(response.data)
      console.log(response.data)
      // console.log(files)

      
      // console.log(files)
    }
    catch(err){
      console.log(err)
    }
  }
  const getFolders=async()=>{
    try
    {
      const response=await axiosConfig.get("/home/user/folders")
      setFolders(response.data)
      console.log(response.data)
      // console.log(files)

      
      // console.log(files)
    }
    catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    getUser();
  })
  return (

    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthPage logged={logged} setLogged={setLogged} token={token} setToken={setToken}/>}/>
      
      
      <Route path="/home/user" element={logged?(<Layout files={files} setFiles={setFiles} folders={folders} setFolders={setFolders}  user={user}/ >):(<Navigate replace to={"/"}/>)}>
      <Route index element={<Landing token={token} files={files} setFiles={setFiles} getFiles={getFiles}  folders={folders} setFolders={setFolders} getFolders={getFolders}  user={user} getFolderFiles={getFolderFiles}/>}/>
      <Route path="/home/user/shared" element={<Shared   user={user}/>}/>
      <Route path="/home/user/Folders" element={<Folders folders={folders} setFolders={setFolders} getFolders={getFolders} getFolderFiles={getFolderFiles}  user={user}/>}/>
      <Route path="/home/user/Folders/:name" element={<FolderFiles folderFiles={folderFiles} folders={folders}  user={user}/>}/>


      </Route>
      
      


      
    </Routes>
    
    
    </BrowserRouter>
    
    
    </>
      
     
     
  
  );
}

export default App;
