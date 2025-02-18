// src/pages/ManageUsersPage.tsx
import { IUser } from '@/api/types';
import UserCard from '@/components/admin-component/user-card.components';
import LoaderLayout from '@/components/loader/loader-layout.component';
import LoaderItem from '@/components/loader/loader.component';
import { selectAuthLoading, selectCurrentUser } from '@/store/auth/auth.selector';
import { fetchFirestoreUsersByChunk } from '@/utils/firebase/firestore.utils';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';


const ManageUsersPage: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const observer = useRef<IntersectionObserver | null>(null);
    const currentUser = useSelector(selectCurrentUser)
    const currentUserLoading = useSelector(selectAuthLoading);
    const queryLimit = 15

    // Function to load a chunk of users
    const loadUsers = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        const lastUserEmail = users.length > 0 ? users[users.length - 1].email : undefined;
        const newUsers = await fetchFirestoreUsersByChunk(queryLimit, lastUserEmail);
        if (newUsers.length < queryLimit) {
            setHasMore(false);
        }
        setUsers((prev) => [...prev, ...newUsers.filter((user) => { if ((!prev.some((prevUser) => prevUser.email == user.email) && user.email !== currentUser?.email)) { return true } }
        )]);
        setLoading(false);
    };


    // Initial load
    useEffect(() => {
        loadUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Use an intersection observer to implement infinite scrolling
    const lastUserRef = useCallback(
        (node: HTMLDivElement) => {
            if (!hasMore || loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    loadUsers();
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    // Update user in state after an operation (upgrade, downgrade, disable, enable)
    const handleUserUpdated = (updatedUser: IUser) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) => (user.email === updatedUser.email ? updatedUser : user))
        );
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                    <UserCard key={user.email} user={user} onUserUpdated={handleUserUpdated} />
                )
                )}
                <div className="h-6" ref={lastUserRef}></div>
            </div>
            {(loading && hasMore) && <div className='w-full py-8 px-4 flex items-center justify-center' ><LoaderItem className='!w-[2rem] !h-[2rem] !border-[0.2rem]'/></div>}
            {!hasMore && <p className="text-center mt-4">No more users to load.</p>}
            {(!currentUser && currentUserLoading) && <LoaderLayout />}
        </div>
    );
};

export default ManageUsersPage;
