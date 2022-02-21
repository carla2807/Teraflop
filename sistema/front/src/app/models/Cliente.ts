export class Client {
  constructor(
    public _id: string,
    public nombre: string,
    public email: string,
    public apellido: string,
    public direccion: string,
    public telefono: number,
    public ciudad: string,
    public codigopostal: number,
    public pais: string
  ) {}
}
