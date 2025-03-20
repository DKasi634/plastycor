import { ADMIN_STATUS } from '@/api/types'
import { BiPlus } from '@/assets'
import BaseButton from '@/components/base-button/base-button.component'
import InnovationsContainer from '@/components/innovations-container/innovations-container.component'

import { selectCurrentUser } from '@/store/auth/auth.selector'
import { SectionContainer } from '@/styles/globals.styles'
import { useSelector } from 'react-redux'

const UnivartizePage = () => {
    const currentUser = useSelector(selectCurrentUser)
    return (
        <div className="flex flex-col py-12">
            <SectionContainer>
            <h3 className="text-4xl font-bold text-dark w-full text-center mt-[2rem] px-6">Univartize</h3>
            <p className="text-lg text-dark w-full text-center my-[2rem] px-6">Découvrez et partagez des techniques innovantes de recyclage créatif</p>
                <InnovationsContainer OwnerEmail={null}/>
            </SectionContainer>
            {(currentUser && (currentUser.adminStatus === ADMIN_STATUS.CO_ADMIN || currentUser.adminStatus === ADMIN_STATUS.MAIN_ADMIN)) &&
             <BaseButton href="/univartize/create" className="fixed right-[2rem] bottom-[3rem] z-40 shadow-lg shadow-dark-transparent lg:bottom-[2rem] font-semibold !text-sm">Ajouter <BiPlus className='text-xl ml-1' /></BaseButton>      }
        </div>
    )
}

export default UnivartizePage