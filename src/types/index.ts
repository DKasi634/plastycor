import React, { ReactNode } from "react";

export interface ISection extends React.HTMLAttributes<HTMLDivElement>{}

export type Activity = {
    id:string,
    title:string,
    image:string,
    description:string
}

export type Creator = {
    name: string,
    image: string,
    organisation: string,
    location: { city: string, country: string },
    bio: string,
    skills: string[],
    phoneNumber: string
}

export type Testimonial = {
    name: string;
    content: string;
};

export type MenuItem = {
    label: string,
    icon: ReactNode,
    path: string
  }

export type SelectedImage = {
    file:File,
    url:string;
}