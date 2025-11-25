import Api from "./api.service";

export default{
      listar() {
            return Api().get("/v1/tipos-mascotas")
        },
        obtenerPorId(id) {                 
            return Api().get(`/v1/tipos-mascotas/${id}`)
        },
        guardar(datos) {
            return Api().post("/v1/tipos-mascotas", datos)
        },
        modificar(id, datos) {             
            return Api().put(`/v1/tipos-mascotas/${id}`, datos)
        },
        eliminar(id) {
            return Api().delete(`/v1/tipos-mascotas/${id}`)
        }
}