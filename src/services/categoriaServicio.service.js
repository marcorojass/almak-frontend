import Api from "./api.service.js";

export default {
    listar() {
        // Pedimos "todos" (o un número muy grande) para mostrar sin paginar
        return Api().get("/v1/categorias-servicios?size=1000&limit=1000");
    },
    mostrar(id) {
        return Api().get(`/v1/categorias-servicios/${id}`);
    },
    guardar(datos) {
        return Api().post("/v1/categorias-servicios", datos);
    },
    modificar(id, datos) {
        return Api().put(`/v1/categorias-servicios/${id}`, datos);
    },
    eliminar(id) {
        return Api().delete(`/v1/categorias-servicios/${id}`);
    }
}