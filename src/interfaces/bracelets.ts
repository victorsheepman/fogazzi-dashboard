export enum Color {
    Black='black',
    Silver='#e3e4e5',
    Gold='#ffd700'
}

export enum Modelo {
    modelo1="Modelo 1"
}


export enum Size {
    Small = 'S',
    Medium = 'M',
}
  

export interface IBracelet {
    model:number | string,
    color:string,
    size:string,
    price:number,
    sold: boolean,
    _id:string
}