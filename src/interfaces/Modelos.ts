export type Color = {
    name:string,
    hex:string, 
    _id:string
}
export interface IModelo{
    _id:string,
    name:string,
    color:Color[],
    price:number
}