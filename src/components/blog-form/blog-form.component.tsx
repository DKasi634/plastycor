import { useEffect, useState } from "react";
import BaseButton from "@/components/base-button/base-button.component";
import GenericInput from "../generic-input/generic-input.component";
import { Blog } from "@/api/types";
import { IoCloudUploadOutline } from "@/assets";
import { useDispatch, useSelector } from "react-redux";
import { setErrorToast } from "@/store/toast/toast.actions";
import { uploadImageToStorage } from "@/utils/firebase/firestore.utils";
import { selectCurrentUser } from "@/store/auth/auth.selector";
import LoaderLayout from "../loader/loader-layout.component";
import GenericImage from "../generic-image/generic-image.component";

interface BlogFormProps {
    initialData?: Blog|null; // For editing an existing blog
    onSubmit:(newBlog:Blog) => void
}

const BlogForm = ({ initialData, onSubmit }: BlogFormProps) => {
    
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState<File | null>(null); // To handle the selected file
    const [formData, setFormData] = useState<Blog>({
        id:new Date().getTime().toString(),
        title: "",
        content: "",
        image: "", // This will store the URL of the selected image
        publisherEmail: "", // Pre-filled with the current user's email
        views:0,
        disabled:false,
        createdAt:""
    });

    useEffect(()=>{
        if(initialData){
            setFormData(initialData);
        }
    }, [initialData])
    const [canSubmit, setCanSubmit] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const currentUser = useSelector(selectCurrentUser);

    useEffect(()=>{
        if(canSubmit && formData.image){
            setIsSubmitting(false)
            onSubmit(formData)

    }
    }, [canSubmit])

    useEffect(()=>{
        if(currentUser){
            setFormData(prev => ({...prev, publisherEmail:currentUser.email}))
        }
    }, [currentUser])

    
    const handleTitleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setFormData(prev => ({...prev, title:e.target.value}))
    }
    const handleContentChange = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
        setFormData(prev => ({...prev, content:e.target.value}))
    }
    

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            // const reader = new FileReader();
            // reader.onloadend = () => {
            //     setFormData((prev) => ({ ...prev, image: reader.result as string }));
            // };
            // reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true)
            if (!formData.title || !formData.content  || !(selectedImage || formData.image)) {
                dispatch(setErrorToast("Please fill all the required fields")); throw new Error("Missing fields ")
            }  
            if(selectedImage){
                const uploadedBlogImage = await uploadImageToStorage(selectedImage, "Blogs");
                if(!uploadedBlogImage){ dispatch(setErrorToast("Failed to upload image, check your network and try again !")); throw new Error("Failed to upload image !") };
                setFormData(prev => ({...prev, image:uploadedBlogImage}))
            }
            setFormData(prev => ({...prev, createdAt:new Date().toISOString()}))
            setCanSubmit(true)
        } catch (error) {
            setIsSubmitting(false)
        }
        
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 py-4 w-full max-w-[90rem] mx-auto">
            <>
            {/* Form Section */}
            <form
                onSubmit={handleSubmit}
                className="flex-1 space-y-4 bg-white p-6 rounded-lg shadow-md"
            >
                <GenericInput
                    label="Title"
                    type="text"
                    name="title"
                    value={formData.title || ""}
                    onChange={handleTitleChange}
                />

                <div>
                    <label className="block text-xs font-bold text-dark/80">Content</label>
                    <textarea
                        name="content"
                        value={formData.content || ""}
                        onChange={handleContentChange}
                        rows={5}
                        className="mt-1 block w-full px-3 py-[0.6rem] rounded-lg bg-gray-transparent text-dark text-sm font-semibold placeholder:text-gray sm:text-sm"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <div className="mt-1 flex items-center space-x-2">
                        {/* Styled Button to Trigger File Input */}
                        <label  htmlFor="image-upload"
                            className="cursor-pointer flex flex-col items-center justify-center gap-2 px-4 py-2 rounded-lg border-[1.5px] border-orange bg-gray-variant w-[6rem]"
                        >
                            <span className="text-xl">
                                <IoCloudUploadOutline />
                            </span>
                            <span className="text-sm text-dark font-semibold w-full text-center">
                                Choose Image
                            </span>
                        </label>

                        {/* Hidden File Input */}
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                </div>

                <BaseButton submitType="submit" className="w-full md:w-fit">
                    Save Blog
                </BaseButton>
            </form>

            {/* Image Preview Section */}
            <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                {
                    <GenericImage src={selectedImage && URL.createObjectURL(selectedImage)||formData.image}  alt="Preview"
                        className="w-full max-h-[300px] object-cover rounded-md border border-gray-300"
                    />

                }
            </div>
            </>
            { isSubmitting && <LoaderLayout/> }

        </div>
    );
};

export default BlogForm;