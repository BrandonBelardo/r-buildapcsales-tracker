import Navbar from "@/components/Landing/Navbar";
import { PageContainer } from "@/components/Landing/PageContainer";
import styled from "styled-components";
import Link from "next/link";
import dashboard_image from 'assets/notification.png';
import Image from 'next/image';
import { useStateContext } from "@/context/StateContext";

export default function Home() {
    const { user } = useStateContext();
    return (
        <>
            <Navbar />
            <PageContainer>
                <LandingTextContainer>
                    <MainHeader>
                        Build Your Next PC For Less
                    </MainHeader>
                    <MainSubHeader>
                        Configure notifications with Telegram to be instantly alerted of new sales.
                    </MainSubHeader>
                    {user ?
                        <GetStartedButton href="/dashboard">Get Started</GetStartedButton> :
                        <GetStartedButton href="/account/signup">Get Started</GetStartedButton>}
                </LandingTextContainer>
                <ImageContainer>
                    <StyledImage src={dashboard_image} alt="dashboard image"></StyledImage>
                </ImageContainer>

            </PageContainer>

        </>
    );
}

const ImageContainer = styled.div`
    width: 800px;
    margin-top: 20px;
    `

const StyledImage = styled(Image)`
    width: 100%;
    height: auto;
    border-radius: 16px;
    box-shadow: 0px 0px 10px rgb(255, 255, 255);
    `

const LandingTextContainer = styled.div`
    margin-top: 100px;
    max-width: 600px;
    font-weight: 500;
    

 `;

const MainHeader = styled.h1`
    margin: 0px;
    font-size: 3.5rem;
 
 `;

const MainSubHeader = styled.h2`
    font-size: 1.5rem;
    font-weight: 200;
    margin: 0.5rem;
 `;

const GetStartedButton = styled(Link)`
    display: inline-block;
    background-color:rgb(81, 138, 227);
    padding: 0.5rem 0.875rem;
    margin: 1rem;
    font-weight: 750;
    font-size: 1.1rem;
    border-color: rgb(81, 138, 227);
    border-radius: 0.2rem;
    width: 7rem;
    transition: background-color 0.2s;

    &:hover {
        background-color: rgb(67, 111, 182);
    }

    
 `  