import styled from "styled-components";

export default function Navbar() {
    return(
        <NavContainer>
            <NavLogoLink href="/">
                <NavLogo src ="https://cdn1.iconfinder.com/data/icons/computer-components-6/32/cpu_processor_computer_chip-512.png"/>
            </NavLogoLink>
            <NavLinkContainer>  
                <NavLink href=  "#">Log in</NavLink>
                <NavLink href="#">Sign up</NavLink>
            </NavLinkContainer>
        </NavContainer>
    );
}

const NavContainer = styled.div`
    align-items: center;
    background-color: rgba(12, 13, 15, 0.7);
    backdrop-filter: blur(5px);
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    height: 4.5rem;
    left: 0px;
    top: 0px;
    padding: 0px;
    position: fixed;
    width: 100%;    
    font-size: 1.2rem;
    box-shadow: 0px 0px 5px 0px rgb(2, 2, 3);
`;


const NavLogoLink = styled.a``;

const NavLogo = styled.img`
    width: 4rem;
    margin: 1rem;
`;



const NavLinkContainer = styled.nav`
    display: inline-block;
    text-align: right;
    margin: 1rem;
`;

const NavLink = styled.a`
    margin: 1.5rem;
    color: inherit;
    font-family: inherit;
    text-decoration: none;
`;
