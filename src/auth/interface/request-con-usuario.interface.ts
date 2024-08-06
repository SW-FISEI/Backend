export interface RequestConUsuario extends Request {
    usuario: {
        email: string,
        rol: string
    }
}
