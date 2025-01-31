import { PrincipleData } from "@/constants/data"

type PrincipleCardProps = {
    className?:string,
    data:PrincipleData
}

const PrincipleCard = ({className="", data:{icon, title, content}}:PrincipleCardProps) => {
  return (
    <div className={`${className} flex flex-col items-start justify-center p-8 rounded-lg gap-3`}>
        <span className="text-2xl w-16 h-16 aspect-square flex justify-center items-center rounded-full bg-green-transparent text-green mx-auto">{icon}</span>
        <h3 className="text-xl font-semibold text-center w-full">{title}</h3>
        <p className="text-sm font-normal text-center w-full">{content}</p>
    </div>
  )
}

export default PrincipleCard;