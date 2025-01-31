import { SectionContainer, GridContainerSm } from '@/styles/globals.styles'
import ArticleCard from '../article-card/arcticle-card.component'
import { articles } from '@/constants/data'
import BaseButton from '../base-button/base-button.component'


const ArticlesSection = () => {
  return (
     <section className="flex items-center justify-center gap-4 py-8 ">
                <SectionContainer>
                    <h3 className="text-3xl text-dark w-full text-center my-[3rem]">Nos derniers artcles</h3>
                    <GridContainerSm className="pb-4">
                        {
                            articles.map((article, index) =>( 
                                <ArticleCard key={index} article={article} />
                             ))
                        }
                    </GridContainerSm>

                    <div className="w-full flex items-center justify-center py-2"> <BaseButton> Tous les articles ... </BaseButton> </div>
    
                </SectionContainer>
            </section>
  )
}

export default ArticlesSection