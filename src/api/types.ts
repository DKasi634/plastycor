
export enum ADMIN_STATUS {
    MAIN_ADMIN="MAIN_ADMIN",
    CO_ADMIN="CO_ADMIN",
    NONE="NONE"
}

export type IUser = {
    email:string,
    firstName:string,
    lastName:string,
    adminStatus?:ADMIN_STATUS,
    createdAt:string,
    phoneNumber:string,
    profilePicture:string,
    disabled:boolean
}

export type Product = {
    id:string,
    ownerEmail:string,
    categoryId:string,
    name:string,
    createdAt:string,
    images:string[],
    description:string,
    price:number,
    disabled:boolean
}

export type Location = {
    country:string,
    city:string
}

export type Innovation = {
    id:string,
    ownerEmail:string,
    name:string,
    images:string[],
    likes:number,
    views:number,
    location:Location,
    disabled:boolean
}


export type Creator = {
    email:string,
    organization:string,
    location:Location,
    bio:string,
    tags:string[],
    disabled:boolean
}

export type Blog = {
    publisherEmail:string,
    title:string,
    content:string,
    createdAt:string,
    views:number
}