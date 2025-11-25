import Api from "./api.service";

export default {
    listar(page=0,size=10){
        return Api().get(`/v1/mascotas?page=${page}&size=${size}`);
    },
     listarFiltradas(params) {
        return Api().get("/v1/mascotas/filtrar", { params });
    },
    mostrar(id){
        return Api().get(`/v1/mascotas/${id}`)
    },
    guardar(datos){
        return Api().post("/v1/mascotas",datos)
        
    },
    modificar(id,datos){
        return Api().put(`/v1/mascotas/${id}`,datos)
        
    },
    eliminar(id){
        return Api().delete(`/v1/mascotas/${id}`)
        
    }
}