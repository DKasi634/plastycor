import { Innovation } from "@/api/types"
import PostInnovationForm from "@/components/post-innovation-form/post-innovation-form.component";
import { selectCurrentUser, selectAuthLoading } from "@/store/auth/auth.selector";
import { SectionContainer } from "@/styles/globals.styles";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const PostInnovationPage = () => {
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);
    const authLoading = useSelector(selectAuthLoading);

    useEffect(() => {
        if (!authLoading && !currentUser) {
            navigate("/signin")
        }
    }, [authLoading, currentUser])

    const productInitialValues: Innovation = { name: "", id: (new Date().getTime().toString()), categoryId: "", ownerEmail: currentUser?.email || '', location: "", createdAt: "", images: [], description: "", disabled: false, likes: 0, views: 0 };

    return (
        <SectionContainer className="flex flex-col pb-[5rem] py-8">
            <h3 className="text-3xl text-dark my-4">Poster une innovation</h3>
            {
                currentUser && <PostInnovationForm currentUser={currentUser} initialInnovation={productInitialValues} />
            }
        </SectionContainer>
    )
}

export default PostInnovationPage