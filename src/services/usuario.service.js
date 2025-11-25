import Api from "./api.service.js";


export default {
    listar(){
        return Api().get("/v1/usuarios")
    },
    mostrar(id){
        return Api().get(`/v1/usuarios/${id}`)
    },
    guardar(datos){
        return Api().post("/v1/usuarios",datos)
        
    },
    modificar(id,datos){
        return Api().put(`/v1/usuarios/${id}`,datos)
        
    },
    eliminar(id){
        return Api().delete(`/v1/usuarios/${id}`)
        
    }
}