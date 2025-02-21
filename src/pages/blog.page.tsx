import BlogsContainer from "@/components/blogs-container/blogs-container.component"
import { SectionContainer } from "@/styles/globals.styles"


const BlogPage = () => {
  return (
    <div className="flex flex-col">
      <SectionContainer>
        <BlogsContainer />
      </SectionContainer>
    </div>
  )
}

export default BlogPage
