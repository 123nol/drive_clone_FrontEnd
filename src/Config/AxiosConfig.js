import axios from "axios"

const axiosConfig=axios.create({
  baseURL:"http://localhost:8080",
  timeout: 20000,
  headers:{
    "Content-Type":"application/json"
  }
  
  
})
axiosConfig.interceptors.request.use((config)=>{
  const token=localStorage.getItem("token")
  if(token!=null){
    config.headers.Authorization=`Bearer ${token}`;
  }
  return config;
})
export default axiosConfig;