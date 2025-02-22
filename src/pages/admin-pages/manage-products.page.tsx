import { ApiProduct } from "@/api/types";
import AdminProductCard from "@/components/admin-components/admin-product-card.component";
import LoaderItem from "@/components/loader/loader.component";

import { fetchFirestoreProductsByChunk } from "@/utils/firebase/firestore.utils";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { useState, useRef, useEffect } from "react";


const ManageProductsPage = () => {

    const [products, setProducts] = useState<ApiProduct[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData, DocumentData> | null>(null)

    const observerRef = useRef<HTMLDivElement | null>(null);
    const queryLimit = 15;

    const fetchProducts = async () => {
        if (!hasMore) { return };
        setIsLoading(true)
        try {
            const resultDocs = await fetchFirestoreProductsByChunk(queryLimit, null, lastDoc);
            if (resultDocs.length < queryLimit) { setHasMore(false) };
            if (resultDocs.length) {
                setLastDoc(resultDocs[resultDocs.length - 1])
                const newProducts = resultDocs.map(doc => doc.data() as ApiProduct);
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
        <div className={`flex flex-col mx-auto py-4`}>
            <h2 className="text-2xl md:text-3xl w-full text-center text-dark mb-4"> Gérer des produits</h2>
            <div className="grid grid-cols-1 md:!flex md:!items-center md:!justify-start md:!flex-wrap gap-[1rem]">
            {(!isLoading && products.length) ?
                    products.map((product) => (
                        <AdminProductCard className="md:!max-w-[18rem] "
                            key={product.id}
                            product={product}
                        />
                    ))
                :
                <></>
            }
            </div>
            {isLoading && <LoaderItem className="w-[2.5rem] border-[0.1rem] mt-[4rem]" />}
            <div className="h-10" ref={observerRef}></div>
        </div>
    )
}

export default ManageProductsPage