import { Innovation } from "@/api/types"
import LoaderLayout from "@/components/loader/loader-layout.component";
import PostInnovationForm from "@/components/post-innovation-form/post-innovation-form.component";
import { selectCurrentUser, selectAuthLoading } from "@/store/auth/auth.selector";
import { SectionContainer } from "@/styles/globals.styles";
import { getInnovationById } from "@/utils/firebase/firestore.utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


const EditInnovationPage = () => {
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);
    const authLoading = useSelector(selectAuthLoading);

    const { innovationId } = useParams<{ innovationId: string }>(); // Extract innovationId from URL params
    const [thisInnovation, setThisInnovation] = useState<Innovation | null>(null);
    const [loading, setLoading] = useState(false);
    

    const fetchInnovation = async (id: string) => {
        setLoading(true);
        try {
            const thisInnovation: Innovation | null = await getInnovationById(id);
            if (!thisInnovation) { throw new Error("Failed to load the thisInnovation") }
            setThisInnovation(thisInnovation);
            
        } catch (err) { navigate("/not-found")
        } finally { setLoading(false);}
    };
    useEffect(() => {
        if(innovationId){
            fetchInnovation(innovationId)
        }
    }, [innovationId])

    useEffect(() => {
        if (!authLoading && !currentUser) {
            navigate("/signin")
        }
    }, [authLoading, currentUser])


    return (
        <SectionContainer className="flex flex-col pb-[5rem] py-8">
            <h3 className="text-3xl text-dark my-4">Modifier une innovation</h3>
            {
                (currentUser && thisInnovation) && <PostInnovationForm currentUser={currentUser} initialInnovation={thisInnovation} />
            }
            {loading && <LoaderLayout />}
        </SectionContainer>
    )
}

export default EditInnovationPage