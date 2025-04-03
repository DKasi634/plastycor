import { ADMIN_STATUS, Blog, IUser } from "@/api/types"
import BaseButton, { buttonType } from "@/components/base-button/base-button.component";
import GenericImage from "@/components/generic-image/generic-image.component";
import LoaderLayout from "@/components/loader/loader-layout.component";
import { selectCurrentUser, selectAuthLoading } from "@/store/auth/auth.selector";
import { setErrorToast } from "@/store/toast/toast.actions";
import { getFirestoreUserByEmail, getBlogById } from "@/utils/firebase/firestore.utils";
import DOMPurify from 'dompurify'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NotFoundPage from "./errors/not-found.page";
import { CiEdit } from "react-icons/ci";
import { getFullDateFromIsostring } from "@/utils/index.utils";
import { selectReadBlogsIds } from "@/store/blogs/blogs.selector";
import { readBlogStart } from "@/store/blogs/blogs.actions";



const SingleBlogPage = () => {


    const { blogId } = useParams<{ blogId: string }>(); // Extract blogId from URL params
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [blogPublisher, setBlogPublisher] = useState<IUser | null>(null);
    const [blogFound, setBlogFound] = useState(true);

    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);
    const userLoading = useSelector(selectAuthLoading);
    const readBlogsIds = useSelector(selectReadBlogsIds);
    // const readBlogsIdsLoading = useSelector(selectReadBlogsLoading);

    const setErrorMessage = (error: string) => dispatch(setErrorToast(error));

    // Call to fetch blog data
    const fetchBlog = async (id: string) => {
        setLoading(true);
        try {
            const blog: Blog | null = await getBlogById(id);
            if (!blog) { throw new Error("Failed to load the blog") }

            setBlog(blog);
            const owner = await getFirestoreUserByEmail(blog.publisherEmail);
            setBlogPublisher(owner);
        } catch (err) {
            setErrorMessage("Failed to load blog details.");
            setBlogFound(false)
        } finally {
            setLoading(false);
        }
    };


    useEffect(()=>{
        if(blog && !readBlogsIds.some(id => id === blog.id)){
            dispatch(readBlogStart(blog))
        }
    }, [blog])

    useEffect(() => {
        if (blogId) {
            fetchBlog(blogId);
        }
    }, [blogId]);

    if (!blogFound && !loading) {
        return <NotFoundPage />
    }

    return (
        <>
            {blog &&
                <div className={`min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8`}>
                    <div className="bg-white p-6 max-w-3xl w-full px-12 mx-auto">
                        <h1 className="text-2xl font-bold text-gray-800 my-8 w-full text-center">{blog.title}</h1>
                        <div className="w-full h-64 shadow-md rounded-lg border border-gray overflow-hidden mb-8">

                            <GenericImage
                                src={blog.image}
                                alt={blog.title}
                                className="object-cover object-center w-full h-full"
                            />
                        </div>

                        <div className="text-dark/80 text-sm font-semibold py-3 w-full leading-6" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(blog.content)}}/>

                        <div className="flex items-center justify-start gap-4 mt-8 w-full">
                            <div className="flex items-center justify-start gap-1 w-fit">
                                <div className="rounded-full aspect-square w-[1.5rem] overflow-hidden">
                                    <GenericImage loading="lazy" src={blogPublisher?.profilePicture} className="object-cover object-center w-full h-full" alt="" />
                                </div>
                                <span className="text-xs font-semibold text-dark text-left">{blogPublisher?.firstName} {blogPublisher?.lastName}</span>
                            </div>
                            <span className="text-xs font-bold text-dark/80 text-left">{getFullDateFromIsostring(blog.createdAt)}</span>
                        </div>
                        {(currentUser && currentUser.email === blogPublisher?.email && ([ADMIN_STATUS.CO_ADMIN, ADMIN_STATUS.MAIN_ADMIN].some(val => val === blogPublisher.adminStatus))) &&
                            <BaseButton type={buttonType.light} className="!fixed !bottom-[4rem] !right-[3rem] !font-bold shadow-lg shadow-dark-transparent !border-gray" href={`/blogs/edit/${blog.id}`} > Modifier <CiEdit className="text-xl ml-2" /></BaseButton>
                        }
                    </div>
                </div>
            }
            {
                (loading || userLoading) && <LoaderLayout />
            }
        </>
    );
}

export default SingleBlogPage