import Api from "./api.service.js";

export default {
    listar() {
        // Pedimos todas las razas
        return Api().get("/v1/razas?size=1000&limit=1000");
    },
    mostrar(id) {
        return Api().get(`/v1/razas/${id}`);
    },
    guardar(datos) {
        return Api().post("/v1/razas", datos);
    },
    modificar(id, datos) {
        return Api().put(`/v1/razas/${id}`, datos);
    },
    eliminar(id) {
        return Api().delete(`/v1/razas/${id}`);
    }
}