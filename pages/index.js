import Navbar from "@/components/Landing/Navbar";
import styled from "styled-components";

export default function Home() { 
    return(
        <>
            <Navbar/>
            <PageContainer>
                <LandingTextContainer>
                    <MainHeader>
                        Build Your Next PC For Less
                    </MainHeader>
                    <MainSubHeader>
                        Configure notifications to be instantly alerted of new sales.   
                    </MainSubHeader>
                </LandingTextContainer>
            </PageContainer>
        </>
    );
 }

 const PageContainer = styled.div`
    display: flex;
    justify-content: center; /* Centers horizontally */
    text-align: center;
    min-height: 100vh; /* Ensures it covers the full viewport */
    width: 100%;
    padding: 20px; /* Prevents content from touching edges */
    box-sizing: border-box;

 `;

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
    margin: 5px;
    font-size: 1.5rem;
    font-weight: 300;
 `;

 const GetStartedButton = styled.button`
    
 `