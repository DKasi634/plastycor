import { ReactNode } from "react"
import { Link } from "react-router-dom"

export enum buttonType {
  dark = "dark",
  light = "light",
  green = "green",
  blue = "blue",
  clear = "clear",
}

type BaseButtonProps = {
  className?: string,
  children: ReactNode,
  rounded?: boolean,
  type?: buttonType,
  submitType?:'submit'|'reset'|'button'
  href?: string,
  clickHandler?: () => void
}


const BaseButton = ({ className = "", children, rounded = true, type = buttonType.blue, href, submitType="button", clickHandler = ()=>{}}: BaseButtonProps) => {

  const renderButton = () => {
    const classNameValue = `${className} w-fit flex items-center text-sm font-medium justify-center px-8 py-[0.5rem] select-none border-[1.5px] ${rounded ? 'rounded-full' : 'rounded-lg'
      } ${type === buttonType.dark
        ? 'bg-dark hover:bg-dark-secondary text-light border-dark'
        : type === buttonType.clear
          ? 'bg-transparent border-dark text-dark'
          :type === buttonType.green ? 'bg-green hover:bg-green-variant text-light border-green hover:border-green-variant'
          :type === buttonType.light ?'bg-light hover:bg-light-variant text-dark border-light'
          : 'bg-blue hover:bg-blue-variant text-light border-blue hover:border-blue-variant'
      } transition duration-300`;

    return href ? (
      <Link className={classNameValue} to={href} onClick={clickHandler}>
        {children}
      </Link>
    ) : (
      <button className={classNameValue} type={submitType} onClick={clickHandler}>
        {children}
      </button>
    );
  };


  return (renderButton())
}

export default BaseButton