import { Article } from "@/constants/data"


type ArticleCardProps = {
    className?: string,
    article: Article
}

const ArticleCard = ({ className = "", article: { image, title, description, published, views } }: ArticleCardProps) => {
    return (
        <div className={`${className} flex flex-col items-start justify-start min-h-fit max-h-max p-[2px] rounded-lg border border-gray shadow-sm shadow-dark-transparent overflow-hidden pb-0`}>
            <div className="w-full h-[40%] mb-4 rounded-lg overflow-hidden"> <img loading="lazy" src={image} alt="Article" className="w-full h-full object-cover object-center" /> </div>

            <div className="flex flex-col items-center justify-start h-full max-h-[12rem] gap-3 p-4">
                <div className="flex flex-col w-full min-h-[6rem] h-fit gap-3 py-4">
                    <h3 className="text-lg font-semibold text-left w-full line-clamp-2 ">{title}</h3>
                    <p className="text-sm font-normal text-left w-full line-clamp-3">{description}</p>
                </div>
            </div>
            <div className="flex items-center justify-between text-sm gap-4 w-full max-h-[4rem] py-4 px-8 h-full"><span className="font-bold">{published.getDate()}/{published.getMonth() + 1}/{published.getFullYear()}</span>
                    <span className="font-semibold">{views} vues</span>
                </div>
        </div>
    )
}

export default ArticleCard