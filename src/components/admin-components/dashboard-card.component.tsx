

import { DashBoardRoute } from '@/types'

import { Link } from 'react-router-dom'


type DashBoardCardProps = {
    className?:string,
    cardRoute:DashBoardRoute
}

const DashboardCard = ({className="", cardRoute}:DashBoardCardProps) => {
  return (
    <Link
          to={cardRoute.path}
          className={`${className} bg-gray/20 rounded-xl shadow-lg transform hover:scale-[1.02] transition duration-300 p-8 flex flex-col items-center`}
        >
          <span className="text-5xl mb-4">{cardRoute.icon}</span>
          <h2 className="text-lg md:text-xl text-center font-semibold mb-2 w-full">{cardRoute.label}</h2>
          <p className="text-center text-dark/60 text-xs">
           {cardRoute.description}
          </p>
        </Link>
  )
}

export default DashboardCard