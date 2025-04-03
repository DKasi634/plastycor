
import GenericImage from "../generic-image/generic-image.component"
import { Blog } from "@/api/types"
import { getFullDateFromIsostring } from "@/utils/index.utils"
import DOMPurify from 'dompurify'


type BlogCardProps = {
    className?: string,
    blog: Blog
}

const BlogCard = ({ className = "", blog }: BlogCardProps) => {

    const blogContent = DOMPurify.sanitize(blog.content)

    return (
        <div className={`${className} md:max-w-[20rem] flex flex-col items-start justify-start min-h-fit max-h-max p-[2px] rounded-lg border border-gray shadow-sm shadow-dark-transparent overflow-hidden pb-0`}>
            <div className="w-full h-[16rem] md:h-[20rem] mb-4 rounded-lg overflow-hidden"> <GenericImage loading="lazy" src={blog.image} alt={blog.title} className="w-full h-full object-cover object-center" /> </div>

            <div className="flex flex-col items-center justify-start gap-3 p-4">
                <div className="flex flex-col w-full h-fit gap-3 ">
                    <h3 className="text-lg font-semibold text-left w-full line-clamp-1 ">{blog.title}</h3>
                    <div className="text-sm font-normal text-left w-full line-clamp-3 min-h-[max-content]" dangerouslySetInnerHTML={{__html:blogContent}}/>
                </div>
            </div>
            {/* <div className="flex items-center justify-start gap-1 w-fit">
                <div className="rounded-full aspect-square w-[1.5rem] overflow-hidden">
                    <GenericImage loading="lazy" src={blogPublisher?.profilePicture} className="object-cover object-center w-full h-full" alt="" />
                </div>
                <span className="text-xs font-semibold text-dark text-left">{blogPublisher?.firstName} {blogPublisher?.lastName}</span>
            </div> */}
            <div className="flex items-center justify-between text-sm gap-4 w-full py-4 px-8"><span className="font-bold">{getFullDateFromIsostring(blog.createdAt)}    </span>
                <span className="font-semibold">{blog.views} vue{blog.views > 1 ? 's' : ''}</span>
            </div>
        </div>
    )
}

export default BlogCard