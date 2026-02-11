import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers:{
      "Content-Type": "application/json",
       Accept: "application/json",
  },
  timeout: 10000,
});
apiClient.interceptors.request.use(async(config)=>{
  const token=localStorage.getItem("jwtToken");
  if(token){
    config.headers.Authorization=`Bearer ${token}`;
  }
  return config;
}
,error=>{
  return Promise.reject(error);
}
);

export default apiClient;
