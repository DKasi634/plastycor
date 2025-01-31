import React, { ReactNode } from "react"


interface NavBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    className?:string,
    icon:ReactNode
}

const NavBtn:React.FC<NavBtnProps> = ({className="",icon,  onClick, ...rest}) => {
  return (
    <button className={`${className} px-4 py-3 border-[2px] border-green-secondary rounded-md text-2xl text-green w-fit cursor-pointer`} onClick={onClick} {...rest}>{icon}</button>
  )
}

export default NavBtn