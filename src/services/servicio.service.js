import Api from "./api.service.js";


export default {
    listar(){
        return Api().get("/v1/servicios")
    },
    listarPorCategoriaYNombre(id, nombre = "", page = 0, size = 10) {
        return Api().get(`/v1/servicios/categoria/${id}/buscar`, {
            params: { nombre, page, size }
        });
    },
    mostrar(id){
        return Api().get(`/v1/servicios/${id}`)
    },
    guardar(datos){
        return Api().post("/v1/servicios",datos)
        
    },
    modificar(id,datos){
        return Api().put(`/v1/servicios/${id}`,datos)
        
    },
    eliminar(id){
        return Api().delete(`/v1/servicios/${id}`)
        
    }
}