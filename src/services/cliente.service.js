import Api from "./api.service";

export default {
    listar(params){
        return Api().get("/v1/usuarios/clientes",{ params })
    },
    
    mostrar(id){
        return Api().get(`/v1/usuarios/clientes/${id}`)
    },
    mostrarCLienteCi(ci){
        return Api().get(`/v1/usuarios/clientes/ci-usuario/${ci}`);
    }
    ,
    guardar(datos){
        return Api().post("/v1/usuarios/clientes/crear",datos)
        
    },
    modificar(id,datos){
        return Api().put(`/v1/usuarios/clientes/editar/${id}`,datos)
        
    },
    eliminar(id){
        return Api().delete(`/v1/usuarios/clientes/eliminar/${id}`)
        
    }
}