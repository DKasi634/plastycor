import styled from "styled-components";

export const CardsCarouselWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: start;
    gap: 2rem;
    padding-inline:1rem;
    overflow-x: scroll;
    scroll-snap-type:inline mandatory;
    &::-webkit-scrollbar{
        width: 0px;
    }
`

export const CarouselCard = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.2);
    scroll-snap-align: start;
    flex-shrink: 0;
`

export const PaginationDotsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-block: 1rem 3rem;
    gap: 1rem;
`

interface PaginationDotProps {
    $active:boolean
}

export const PaginationDot = styled.span<PaginationDotProps>`
    width: 1.5rem;
    height: 0.5rem;
    border-radius: 1rem;
    background-color: ${({$active}) => $active ? 'rgb(25, 122, 60)':"#E0E0E0"};
`



export const CarouselContainer = styled.div`
    &::-webkit-scrollbar{
        width: 0;
    }
    scrollbar-width: none; 
`

export const CarouselContent = styled.div`
    display: flex;
    gap: 16px;
    scroll-snap-type: x mandatory;
    overflow-x: scroll;
    scroll-behavior: smooth;
    scrollbar-width: none;
    
  `

// Styled Components for Activity Cards
export const Card = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: white;
  scroll-snap-align: center;
  text-align: center;
`;
