import { Article } from "@/constants/data"


type ArticleCardProps = {
    className?: string,
    article: Article
}

const ArticleCard = ({ className, article: { image, title, description, published, views } }: ArticleCardProps) => {
    return (
        <div className={`${className} flex flex-col items-start justify-start p-[2px] rounded-lg border border-gray shadow-sm shadow-dark-transparent overflow-hidden pb-0` }>
            <div className="w-full h-[40%] mb-4 rounded-lg overflow-hidden"> <img src={image} alt="Article" className="w-full h-full object-cover object-center" /> </div>

            <div className="flex flex-col items-center justify-start gap-3 p-4 -mb-24">
                <h3 className="text-xl font-semibold text-left w-full line-clamp-2 ">{title}</h3>
                <p className="text-sm font-normal text-left w-full line-clamp-3">{description}</p>

                <div className="flex items-center justify-between text-sm gap-4 w-full"><span className="font-bold">{published.getDate()}/{published.getMonth() + 1}/{published.getFullYear()}</span>
                    <span className="font-semibold">{views} vues</span>
                </div>
            </div>
        </div>
    )
}

export default ArticleCard