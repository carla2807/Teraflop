export class Product {
  constructor(
    public _id: string,
    public titulo: string,
    public descripcion: string,
    public imagen: string,
    public marca: string,
    public modelo: string,
    public stock: number,
    public precio: number,
    public nitproveedor: string,
    public nitcategoria: string
  ) {}
}
