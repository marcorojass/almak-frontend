import Api from "./api.service.js";


export default {
    listar(){
        return Api().get("/v1/productos")
    },
    mostrar(id){
        return Api().get(`/v1/productos/${id}`)
    },
    guardar(datos){
        return Api().post("/v1/productos",datos)
        
    },
    modificar(id,datos){
        return Api().put(`/v1/productos/${id}`,datos)
        
    },
    eliminar(id){
        return Api().delete(`/v1/productos/${id}`)
        
    },
    // Nuevo método para filtros
    filtrar({ nombre, categoriaId, stockMayor, stockMenor, stockIgual, page = 0, size = 10, sort = "productoId,desc" }) {
    return Api().get("/v1/productos/buscar", {
        params: {
            nombre,
            categoriaId,
            stockMayor,
            stockMenor,
            stockIgual,
            page,
            size,
            sort // <--- agregamos sort por defecto
        }
    });
}

}