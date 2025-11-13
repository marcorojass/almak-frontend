import axios from "axios";

export const BASE_URL = "http://localhost:8080";
export const BASE_URL_API=`${BASE_URL}/api`

export default function Api(){

    const token="ABC.XYZ.QER";
    const api=axios.create({
        baseURL:BASE_URL_API,
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token
        }
    });

    //interceptores
    //observar lo q el backend esta enviano antes
    //de procesarlo o mostrar alog

    api.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        // error de auth 401
        if(error.response?.status==401){
            console.log("INTERCEOTIO ERROR 401 ZZZ")
            location.href="/auth/login"

        }
        // error de permisos 403

        // error 500
        return Promise.reject(error);
        
    }
    );

    return api; 
}