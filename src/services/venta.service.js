import Api from "./api.service";

export default {
   
    listar(params) {
  return Api().get("/v1/ventas/filtro", { params })
},

    mostrar(id){
        return Api().get(`/v1/ventas/${id}`)
    },
    guardar(datos){
        return Api().post("/v1/ventas",datos)
        
    },
    modificar(id,datos){
        return Api().put(`/v1/ventas/editar/${id}`,datos)
        
    },
    eliminar(id){
        return Api().delete(`/v1/ventas/eliminar/${id}`)
        
    }
}