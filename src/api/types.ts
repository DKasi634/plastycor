
export enum ADMIN_STATUS {
    MAIN_ADMIN="MAIN_ADMIN",
    CO_ADMIN="CO_ADMIN"
}

export type IUser = {
    email:string,
    firstName:string,
    lastName:string,
    adminStatus:ADMIN_STATUS|null,
    createdAt:string,
    phoneNumber:string,
    location?:Location,
    organisation?:string,
    bio?:string,
    tags?:string[],
    profilePicture:string,
    disabled:boolean
}

export type ApiProduct = {
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
    categoryId:string,
    ownerEmail:string,
    name:string,
    description:string,
    images:string[],
    likes:number,
    views:number,
    location:string,
    disabled:boolean,
    createdAt:string
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
    id:string,
    publisherEmail:string,
    title:string,
    content:string,
    image:string,
    createdAt:string,
    disabled:boolean,
    views:number
}

export type Category = {
    categoryId:string,
    categoryName:string,
    disabled:boolean,
    createdAt:string
}


// This models the raw response returned by the Netlify function
export interface NetlifyFunctionResponse {
    statusCode: number;
    body: string
  }
  
  // The payload our function sends back. Either a success or error
  export interface SuccessPayload {
    message: string;
  }
  
  export interface ErrorPayload {
    error: string;
  }
    