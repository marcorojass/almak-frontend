import Api from "./api.service";

export default {
    // Agregamos valores por defecto grandes por si necesitamos traer todo
    listar(page = 0, size = 100) {
        return Api().get(`/v1/mascotas?page=${page}&size=${size}`);
    },
    listarFiltradas(params) {
        return Api().get("/v1/mascotas/filtrar", { params });
    },
    mostrar(id) {
        return Api().get(`/v1/mascotas/${id}`); // Esto es lo que da 405, pero lo dejaremos por si se arregla el backend
    },
    guardar(datos) {
        return Api().post("/v1/mascotas", datos);
    },
    modificar(id, datos) {
        return Api().put(`/v1/mascotas/${id}`, datos);
    },
    eliminar(id) {
        return Api().delete(`/v1/mascotas/${id}`);
    }
};