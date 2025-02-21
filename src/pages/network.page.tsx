import { IUser } from '@/api/types'
import BaseButton from '@/components/base-button/base-button.component'
import NetworkCard from '@/components/creator-card/creator-card.component'
import LoaderItem from '@/components/loader/loader.component'
import { selectCurrentUser } from '@/store/auth/auth.selector'

import { SectionContainer } from '@/styles/globals.styles'
import { fetchFirestoreCoAdminsAndAdminsByChunk, firestoreDocSnapshot } from '@/utils/firebase/firestore.utils'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'


const NetworkPage = () => {
    const [networkMembers, setNetworkMembers] = useState<IUser[]>([]);
    const [lastDoc, setLastDoc] = useState<firestoreDocSnapshot | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const observer = useRef<IntersectionObserver | null>(null);

    const currentUser = useSelector(selectCurrentUser);
    const queryLimit = 15;

    const fetchNetworkMembers = async () => {
        if (loading || !hasMore) { return };
        setLoading(true);
        try {
            const fetchedMembersDocs = await fetchFirestoreCoAdminsAndAdminsByChunk(queryLimit, lastDoc);
            if (fetchedMembersDocs.length) {
                setLastDoc(fetchedMembersDocs[fetchedMembersDocs.length - 1]);
                setNetworkMembers(prev => ([...prev, ...fetchedMembersDocs.map(doc => doc.data() as IUser).filter(member => !prev.some(prevMember => prevMember.email === member.email))]))
            }
            if (fetchedMembersDocs.length < queryLimit) { setHasMore(false) }
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchNetworkMembers();
    }, [])

    const observerRef = useCallback((node: HTMLDivElement) => {
        if (!hasMore || loading) { return };
        if (observer.current) {
            observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    fetchNetworkMembers();

                }
            });
            if (node) { observer.current.observe(node) }
        }
    }, [loading, hasMore])

    return (
        <div className="flex flex-col py-12">
            <h3 className="text-4xl font-bold text-dark w-full text-center mt-[2rem]">Notre Réseau</h3>
            <p className="text-lg text-dark w-full text-center my-[2rem]">Connectez-vous avec des créateurs et innovateurs en recyclage créatif</p>

            <SectionContainer>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:flex flex-wrap justify-start items-center gap-4">
                    {networkMembers.map((member) => (
                        <NetworkCard className='lg:max-w-[16rem]' key={member.email} member={member} />
                    )
                    )}
                    <div className="h-6" ref={observerRef}></div>
                </div>
                {(loading && hasMore) && <div className='w-full py-8 px-4 flex items-center justify-center' ><LoaderItem className='!w-[2rem] !h-[2rem] !border-[0.2rem]' /></div>}
            </SectionContainer>
            {currentUser ?
                <BaseButton className='!fixed !bottom-[4rem] right-[2rem]' href='/me/profile/manage-users' >Gérer les utilisateurs</BaseButton> :
                <></>
            }
        </div>
    )
}

export default NetworkPage