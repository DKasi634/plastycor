import { useEffect, useState } from "react";
import BlogForm from "@/components/blog-form/blog-form.component";
import LoaderLayout from "@/components/loader/loader-layout.component";
import { useNavigate, useParams } from "react-router-dom";
import { createOrUpdateBlog, getBlogById } from "@/utils/firebase/firestore.utils";
import { Blog } from "@/api/types";
import { setSuccessToast, setErrorToast } from "@/store/toast/toast.actions";
import { useDispatch } from "react-redux";

const CreateEditBlogPage = () => {
    const { blogId } = useParams<{ blogId: string }>();
    const [blogData, setBlogData] = useState<Blog|null>(null);
    const [loading, setLoading] = useState(false); // Loading state for edit mode

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Fetch blog data if in edit mode
    useEffect(() => {
        if (blogId) {
            const fetchBlog = async () => {
                setLoading(true);
                try {
                    const blog = await getBlogById(blogId);
                    if (blog) {
                        setBlogData(blog);
                    }
                } catch (error) {
                    // console.error("Failed to fetch blog:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchBlog();
        } else {
            setLoading(false);
        }
    }, [blogId]);


    const handleSave = async(newBlog:Blog) =>{
        setLoading(true)
        const submittedBlog = await createOrUpdateBlog(newBlog);
        if(submittedBlog){ dispatch(setSuccessToast("Terminé !")); navigate(`/blogs/${submittedBlog.id}`) 
        }
        else{dispatch(setErrorToast("Desolé, quelque chose s'est mal passé !")) }
        setLoading(false)
};

    return (
        <div className="min-h-screen flex justify-center bg-gray-100 px-8 py-16">
            <div className="max-w-4xl w-full space-y-8 mx-auto">
                <h1 className="text-3xl font-bold text-dark/70 w-full text-center">
                    {blogId ? "Edit Blog" : "Create New Blog"}
                </h1>
                <div className="flex flex-col gap-8">
                    <BlogForm initialData={blogData} onSubmit={handleSave} />
                    {/* <BlogPreview blog={blogData} /> */}
                </div>
            </div>
            { loading && <LoaderLayout/> }
        </div>
    );
};

export default CreateEditBlogPage;