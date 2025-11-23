import Api from "./api.service.js";

export default {
    listar() {
        return Api().get("/v1/razas")
    },
    obtenerPorId(id) {                 // ← CAMBIO AQUÍ (antes era "mostrar")
        return Api().get(`/v1/razas/${id}`)
    },
    guardar(datos) {
        return Api().post("/v1/razas", datos)
    },
    actualizar(id, datos) {             // ← este nombre también cámbialo a "actualizar" para que coincida
        return Api().put(`/v1/razas/${id}`, datos)
    },
    eliminar(id) {
        return Api().delete(`/v1/razas/${id}`)
    }
}