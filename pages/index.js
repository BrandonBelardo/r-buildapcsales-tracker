import Navbar from "@/components/Landing/Navbar";
import { PageContainer } from "@/components/Landing/PageContainer";
import styled from "styled-components";
import Link from "next/link";

export default function Home() {
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
                    <GetStartedButton href="/account/signup">Get Started</GetStartedButton>
                </LandingTextContainer>
            </PageContainer>
        </>
    );
}


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