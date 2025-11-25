import Api from "./api.service.js";


export default {
    listar(){
        return Api().get("/v1/metodos-pagos")
    },
    mostrar(id){
        return Api().get(`/v1/metodos-pagos/${id}`)
    },
    guardar(datos){
        return Api().post("/v1/metodos-pagos",datos)
        
    },
    modificar(id,datos){
        return Api().put(`/v1/metodos-pagos/${id}`,datos)
        
    },
    eliminar(id){
        return Api().delete(`/v1/metodos-pagos/${id}`)
        
    }
}