
import { GridContainerSm } from "@/styles/globals.styles"
import ProductCard from "../product-card/product-card.component"
import { ApiProduct } from "@/api/types"
import { QueryDocumentSnapshot, DocumentData, getDocs, limit, orderBy, query, QueryConstraint, startAfter, where } from "firebase/firestore"
import { useState, useRef, useEffect } from "react"
import {  useSelector } from "react-redux"
import { selectCurrentUser } from "@/store/auth/auth.selector"
import { FIRESTORE_COLLECTIONS, getFirestoreCollectionRef } from "@/utils/firebase/firestore.utils"
import LoaderItem from "../loader/loader.component"


type ProductsContainerProps = {
    className?: string,
    OwnerView?: boolean,
}

const ProductsContainer = ({ className = "", OwnerView = false }: ProductsContainerProps) => {

    const currentUser = useSelector(selectCurrentUser)

    const [products, setProducts] = useState<ApiProduct[]>([]);
    // const dispatch = useDispatch();

    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData, DocumentData> | null>(null)

    const observerRef = useRef<HTMLDivElement | null>(null);
    const queryLimit = 15;

    const fetchProducts = async () => {
        if (!hasMore) { return };
        setIsLoading(true)
        let containerFilter: QueryConstraint | null = null;
        if (OwnerView && currentUser) { containerFilter = where('ownerEmail', "==", currentUser.email)}

        try {
            const constraints: QueryConstraint[] = [
                containerFilter as QueryConstraint,
                where("disabled", "==", false),
                orderBy('createdAt', 'desc'),
                orderBy('id', 'desc'),
                limit(queryLimit)
            ].filter(Boolean)

            let q = query(getFirestoreCollectionRef(FIRESTORE_COLLECTIONS.PRODUCTS_COLLECTION), ...constraints);
            if (lastDoc) {  q = query(q, startAfter(lastDoc))}
            const docsSnapshot = await getDocs(q);
            if (docsSnapshot.docs.length < queryLimit) { setHasMore(false) };
            if (!docsSnapshot.empty) {
                setLastDoc(docsSnapshot.docs[docsSnapshot.docs.length - 1])
                const newProducts = docsSnapshot.docs.map(doc => doc.data() as ApiProduct);
                setProducts(prev => [...prev, ...newProducts]);
            }
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (isLoading) { return };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                fetchProducts(); return
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
            <GridContainerSm className="md:!flex md:!items-center md:!justify-center md:!flex-wrap">
            {(!isLoading && products.length) ?
                    products.map((product) => (
                        <ProductCard className="md:!max-w-[17rem] lg:!max-w-[18rem]"
                            key={product.id}
                            product={product}
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

export default ProductsContainer