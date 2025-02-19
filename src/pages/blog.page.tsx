import ArticlesSection from "@/components/articles-section/articles-section.component"
import { SectionContainer } from "@/styles/globals.styles"


const BlogPage = () => {
  return (
    <div className="flex flex-col">
      <SectionContainer>
        <ArticlesSection />
      </SectionContainer>
    </div>
  )
}

export default BlogPage
