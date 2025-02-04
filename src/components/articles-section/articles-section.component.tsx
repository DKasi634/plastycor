import { SectionContainer, GridContainerSm, GridContainerMd } from '@/styles/globals.styles'
import ArticleCard from '../article-card/arcticle-card.component'
import { articles } from '@/constants/data'
import BaseButton from '../base-button/base-button.component'
import { ISection } from '@/types'


const ArticlesSection: React.FC<ISection> = ({ className = "" }) => {
    return (
        <section className={`${className} flex items-center justify-center gap-4 py-8 `}>
            <SectionContainer>
                <h3 className="text-4xl font-bold text-dark w-full text-center my-[3rem]">Nos derniers articles</h3>
                <p className="text-lg text-dark w-full text-center my-[2rem]">Actualités et innovations en matière de recyclage créatif</p>

                <GridContainerMd className="pb-4">
                    {
                        articles.map((article, index) => (
                            <ArticleCard key={index} article={article} />
                        ))
                    }
                </GridContainerMd>
                <div className="w-full flex items-center justify-center py-2"> <BaseButton> Voir plus ... </BaseButton> </div>
            </SectionContainer>
        </section>
    )
}

export default ArticlesSection