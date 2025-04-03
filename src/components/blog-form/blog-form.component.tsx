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
import BlogEditor from "../blog-editor/blog-editor.component";

interface BlogFormProps {
    initialData?: Blog | null; // For editing an existing blog
    onSubmit: (newBlog: Blog) => void
}

const BlogForm = ({ initialData, onSubmit }: BlogFormProps) => {

    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState<File | null>(null); // To handle the selected file
    const [selectedImageURL, setSelectedImageURL] = useState("");

    const [formData, setFormData] = useState<Blog>({
        id: new Date().getTime().toString(),
        title: "",
        content: "",
        image: "", // This will store the URL of the selected image
        publisherEmail: "", // Pre-filled with the current user's email
        views: 0,
        disabled: false,
        createdAt: ""
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    useEffect(()=>{
        if(selectedImage){
            setSelectedImageURL(URL.createObjectURL(selectedImage))
        }
    }, [selectedImage])
    const [canSubmit, setCanSubmit] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        if (canSubmit && formData.image) {
            setIsSubmitting(false)
            onSubmit(formData)

        }
    }, [canSubmit])

    useEffect(() => {
        if (currentUser) {
            setFormData(prev => ({ ...prev, publisherEmail: currentUser.email }))
        }
    }, [currentUser])


    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, title: e.target.value }))
    }
    const handleContentChange = (content: string) => {
        setFormData(prev => ({ ...prev, content }))
    }


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true)
            if (!formData.title || !formData.content || !(selectedImage || formData.image)) {
                dispatch(setErrorToast("Veiullez remplir tous les champs")); throw new Error("Missing fields ")
            }
            if (selectedImage) {
                const uploadedBlogImage = await uploadImageToStorage(selectedImage, "Blogs");
                if (!uploadedBlogImage) { dispatch(setErrorToast("Nous n'avons pas pu sauvegarder l'image, veuillez vérifier votre connexion puis reéssayer !")); throw new Error("Failed to upload image !") };
                setFormData(prev => ({ ...prev, image: uploadedBlogImage }))
            }
            setFormData(prev => ({ ...prev, createdAt: new Date().toISOString() }))
            setCanSubmit(true)
        } catch (error) {
            setIsSubmitting(false)
        }

    };

    return (
        <div className="flex flex-col items-start justify-start gap-2 py-4 w-full max-w-[90rem] mx-auto">
            <>

                {/* Image Preview Section */}
                <div className=" bg-white py-2 rounded-lg md:shadow-sm w-full">
                    <GenericImage src={selectedImageURL || formData.image} alt="Preview"
                        className="w-full max-h-[300px] object-contain object-center rounded-md border border-gray-300"
                    />
                    <div>
                        <div className="mt-1 flex items-center space-x-2">
                            {/* Styled Button to Trigger File Input */}
                            <label htmlFor="image-upload"
                                className="cursor-pointer flex flex-col items-center justify-center gap-2 px-4 py-2 rounded-lg border-[1.5px] border-orange bg-gray-variant min-w-[6rem] max-w-[8rem]"
                            >
                                <span className="text-xl">
                                    <IoCloudUploadOutline />
                                </span>
                                <span className="text-sm text-dark font-semibold w-full text-center">
                                    Choisir image
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

                </div>

                {/* Form Section */}
                <form
                    onSubmit={handleSubmit}
                    className="w-full space-y-2 bg-white py-2 rounded-lg md:shadow-sm"
                >
                    <GenericInput
                        label="Titre"
                        type="text"
                        name="title"
                        value={formData.title || ""}
                        onChange={handleTitleChange}
                    />

                    <BlogEditor initialContent={initialData?.content || ""} onChange={handleContentChange} />

                    <BaseButton submitType="submit" className="w-full md:w-fit">
                        Finir
                    </BaseButton>
                </form>
            </>
            {isSubmitting && <LoaderLayout />}

        </div>
    );
};

export default BlogForm;