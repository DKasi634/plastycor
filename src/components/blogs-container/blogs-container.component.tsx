import { SectionContainer } from '@/styles/globals.styles'
import BlogCard from '../blog-card/blog-card.component'

import BaseButton from '../base-button/base-button.component'
import { ISection } from '@/types'
import { useEffect, useState } from 'react'
import { ADMIN_STATUS, Blog } from '@/api/types'
import { fetchFirestoreBlogsByChunk, firestoreDocSnapshot } from '@/utils/firebase/firestore.utils'
import LoaderItem from '../loader/loader.component'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '@/store/auth/auth.selector'
import { BiPlus } from '@/assets'


const BlogsContainer: React.FC<ISection> = ({ className = "" }) => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [lastDoc, setLastDoc] = useState<firestoreDocSnapshot | null>(null);

    const currentUser = useSelector(selectCurrentUser);
    const queryLimit = 15


    const fetchBlogs = async () => {
        if (loading || !hasMore) { return }
        setLoading(true)
        try {
            setLoading(true)
            const fetchedDocs = await fetchFirestoreBlogsByChunk(queryLimit, false, lastDoc);
            if (fetchedDocs.length < queryLimit) { setHasMore(false) }
            if (fetchedDocs.length) {
                setLastDoc(fetchedDocs[fetchedDocs.length - 1]);
                // const fetchedBlogs = 
                // console.log("\nFetch complete with fetched blogs : ", fetchedBlogs)
                setBlogs(prev => ([...prev, ...fetchedDocs.map(doc => doc.data() as Blog).filter(blog => !prev.some(prevBlog => prevBlog.id === blog.id))]))
            }
        } catch (error) { }
        finally { setLoading(false) }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])




    return (
        <section className={`${className} flex items-center justify-center gap-4 py-8 px-4 md:px-8`}>
            <SectionContainer>
                <h3 className="text-4xl font-bold text-dark w-full text-center my-[3rem]">Nos derniers articles</h3>
                <p className="text-lg text-dark w-full text-center my-[2rem]">Actualités et innovations en matière de recyclage créatif</p>

                <div className=" grid grid-cols-1 md:grid-cols-2 lg:flex items-center justify-start flex-wrap gap-4 pb-4 !h-min">
                    {blogs.length ?
                        blogs.map(blog => (
                            <Link className='w-full lg:max-w-[18rem] h-fit ' to={`/blogs/${blog.id}`} key={blog.id}>
                                <BlogCard className='!w-full !min-w-full' blog={blog} />
                            </Link>
                        )) :
                        <></>
                    }
                </div>
                {loading && <div className="w-full flex items-center justify-center py-4"> <LoaderItem /> </div>}
                {hasMore &&
                    <div className="w-full flex items-center justify-center py-2"> <BaseButton clickHandler={fetchBlogs}> Voir plus ... </BaseButton> </div>
                }
                {(currentUser && (currentUser.adminStatus === ADMIN_STATUS.CO_ADMIN || currentUser.adminStatus === ADMIN_STATUS.MAIN_ADMIN)) &&
                    <BaseButton href="/blogs/create" className='fixed bottom-[4rem] shadow-dark-transparent shadow-lg right-[3rem]'> Nouveau <BiPlus className='text-xl pl-1' /> </BaseButton>

                }
            </SectionContainer>
        </section>
    )
}

export default BlogsContainer

