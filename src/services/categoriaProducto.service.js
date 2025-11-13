import Api from "./api.service.js";


export default {
    listar(){
        return Api().get("/v1/categorias-productos")
    },
    mostrar(id){
        return Api().get(`/v1/categorias-productos/${id}`)
    },
    guardar(datos){
        return Api().post("/v1/categorias-productos",datos)
        
    },
    modificar(id,datos){
        return Api().put(`/v1/categorias-productos/${id}`,datos)
        
    },
    eliminar(id){
        return Api().delete(`/v1/categorias-productos/${id}`)
        
    }
}