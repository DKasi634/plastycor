import { Blog } from "@/api/types";
import GenericImage from "@/components/generic-image/generic-image.component";

interface BlogPreviewProps {
    blog: Partial<Blog>;
}

const BlogPreview = ({ blog }: BlogPreviewProps) => {
    return (
        <div className="bg-white p-6 max-w-3xl w-full px-12 space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">{blog.title || "Untitled"}</h1>
            <GenericImage
                src={blog.image || "/placeholder.jpg"}
                alt={blog.title || "Placeholder"}
                className="w-64 h-64 object-cover mb-4 shadow-md rounded-lg border border-gray"
            />
            <p className="text-dark/80 text-base font-normal">{blog.content || "No content available."}</p>
        </div>
    );
};

export default BlogPreview;