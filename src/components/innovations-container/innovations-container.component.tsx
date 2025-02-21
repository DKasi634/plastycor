
import { GridContainerSm } from "@/styles/globals.styles"
import { Innovation } from "@/api/types"
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore"
import { useState, useRef, useEffect } from "react"
import { fetchFirestoreInnovationsByChunk } from "@/utils/firebase/firestore.utils"
import LoaderItem from "../loader/loader.component"
import UnivartizeCard from "../univartize-card/univartize-card.component"


type ProductsContainerProps = {
    className?: string,
    OwnerView?: boolean,
}

const InnovationsContainer = ({ className = "", OwnerView = false }: ProductsContainerProps) => {

    const [innovations, setInnovations] = useState<Innovation[]>([]);

    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData, DocumentData> | null>(null)

    const observerRef = useRef<HTMLDivElement | null>(null);
    const queryLimit = 15;

    // const fetchInnovations = async () => {
    //     if (!hasMore) { return };
    //     setIsLoading(true)
    //     let containerFilter: QueryConstraint | null = null;
    //     if (OwnerView && currentUser) { containerFilter = where('ownerEmail', "==", currentUser.email)}

    //     try {
    //         const constraints: QueryConstraint[] = [
    //             containerFilter as QueryConstraint,
    //             where("disabled", "==", false),
    //             orderBy('createdAt', 'desc'),
    //             orderBy('id', 'desc'),
    //             limit(queryLimit)
    //         ].filter(Boolean)

    //         let q = query(getFirestoreCollectionRef(FIRESTORE_COLLECTIONS.INNOVATIONS_COLLECTION), ...constraints);
    //         if (lastDoc) {  q = query(q, startAfter(lastDoc))}
    //         const docsSnapshot = await getDocs(q);
    //         if (docsSnapshot.docs.length < queryLimit) { setHasMore(false) };
    //         if (!docsSnapshot.empty) {
    //             setLastDoc(docsSnapshot.docs[docsSnapshot.docs.length - 1])
    //             const newProducts = docsSnapshot.docs.map(doc => doc.data() as Innovation);
    //             setInnovations(prev => [...prev, ...newProducts]);
    //         }
    //         setIsLoading(false);

    //     } catch (error) {
    //         setIsLoading(false)
    //     }
    // }
    const fetchInnovations = async () => {
            if (isLoading || !hasMore) { return }
            setIsLoading(true)
            try {
                setIsLoading(true)
                const fetchedDocs = await fetchFirestoreInnovationsByChunk(queryLimit, false, lastDoc);
                if (fetchedDocs.length < queryLimit) { setHasMore(false) }
                if (fetchedDocs.length) {
                    setLastDoc(fetchedDocs[fetchedDocs.length - 1]);
                    // const fetchedBlogs = 
                    // console.log("\nFetch complete with fetched blogs : ", fetchedBlogs)
                    setInnovations(prev => ([...prev, ...fetchedDocs.map(doc => doc.data() as Innovation).filter(post => !prev.some(prevInnovation => prevInnovation.id === post.id))]))
                }
            } catch (error) { }
            finally { setIsLoading(false) }
        }
    
        useEffect(() => {
            console.log("\Innovations changed : ", innovations)
        }, [innovations])
    
        useEffect(() => {
            fetchInnovations()
        }, [])

    useEffect(() => {
        if (isLoading) { return };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                fetchInnovations(); return
            }
        }, { threshold: 1.0, rootMargin: "100px 0px 0px 0px" });

        if (observerRef.current) {
            observer.observe(observerRef.current)
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current)
            }
        }
    }, [isLoading])

    return (
        <div className={`${className} flex flex-col`}>
            <GridContainerSm className="md:!flex md:!items-center md:!justify-start md:!flex-wrap">
            {(!isLoading && innovations.length) ?
                    innovations.map((innovation) => (
                        <UnivartizeCard className="md:!max-w-[17rem] lg:!max-w-[18rem]"
                            key={innovation.id}
                            innovation={innovation}
                            ownerView={OwnerView}
                        />
                    ))
                :
                <></>
            }
            </GridContainerSm>
            {isLoading && <LoaderItem className="w-[2.5rem] border-[0.1rem] mt-[4rem]" />}
            <div className="h-10" ref={observerRef}></div>
        </div>
    )
}

export default InnovationsContainer