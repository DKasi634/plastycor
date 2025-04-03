
import styled, { keyframes } from "styled-components";

const green = "rgb(25, 122, 60)";
const greenVariant = "rgb(25, 140, 70)";
const greenSecondary = "rgb(25, 122, 60, 0.8)";
// const greenTransparent = "rgb(25, 122, 60, 0.1)";
// const blue = "rgb(36, 87, 230)";
// const blueVariant = "rgb(30, 90, 230)";
// const blueSecondary = "rgb(36, 87, 230, 0.8)";
// const blueTransparent = "rgb(36, 87, 230, 0.1)";
// const yellow = "rgb(234, 247, 20)";
// const yellowVariant = "rgb(230, 240, 30)";
// const yellowSecondary = "rgb(230, 240, 30, 0.8)";
// const yellowTransparent = "rgb(234, 247, 20, 0.2)";

// const light = "rgb(253, 253, 253)";
const lightTransparent = "rgba(255, 255, 255, 0.1)";
// const gray = "rgb(143, 143, 143)";
// const grayTransparent = "rgba(143, 143, 143, 0.2)";
// const dark = "rgb(36, 36, 36)";
const darkVariant = "rgb(52, 50, 51, 0.5)";
const darkTransparent = "rgba(36, 36, 36, 0.2)";

export const SectionContainer = styled.div`
    width: 92svw;
    margin-inline: auto;

    @media screen and (min-width: 762px) {
        width: 86svw;
    }
    @media screen and (min-width: 1024px) {
        width: 80svw;
    }
    
`
export const LoaderSmWrapper = styled.div`
    border: 0.3rem solid rgb(16, 16, 16);
    border-top-color: rgb(245, 122, 30);
`

export const GridContainerSm = styled.div`
    display: grid;
    align-items: start;
    justify-content: start;
    gap:1rem;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); 
`
export const GridContainerMd = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr)); 
`
export const GridContainerLg = styled.div`
    display: grid;
    gap: 2rem 1rem;
    grid-template-columns: repeat(auto-fit, minmax(21rem, 1fr)); 
`

export const ActivityImageWrapper = styled.div`
    background: linear-gradient(${darkVariant}, ${lightTransparent});
`

// export const StyledNavLink = styled(NavLink)`
    
// `

export const ContactSectionWrapper = styled.div`
`

export const NavLinksWrapper = styled.ul`
& li{
    height: 100%;
    &:hover{
        transform: translateY(-0.3rem);
    }
}
& a{
    height: 100%;
    position: relative;
    font-size: 0.9rem;
    font-weight: 600;
    &.active{
        color: ${green};
        &::before{
        content: '';
        position: absolute;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        background: ${greenVariant};
        bottom: -0.5rem;
        left: calc(50% - 0.2rem);
    }
    }
    &:hover{
        color: ${greenSecondary};
        
    }
}
`

const slideInLeft = keyframes`
    from{
        transform: translateX(100rem);
        opacity: 0;
    }to{
        transform: translateX(0rem);
        opacity: 1;
    }
`
export const NavDrawerWrapper = styled.div`
    animation: ${slideInLeft} 400ms ease-in-out forwards;
`

export const LandingHeroSection = styled.section`
    background: linear-gradient(${darkTransparent}, ${lightTransparent})
`

export const shimer = keyframes`
    from{
        background-position: -200px -100px;
    }to {
        background-position: 200px 100px;
    }
`

export const ShimerEffect = styled.div`
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 30%);
    background-size: 800px 100%;
    animation: ${shimer} 1.5s infinite;
`

