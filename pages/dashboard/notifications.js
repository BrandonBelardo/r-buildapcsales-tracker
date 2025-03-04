import styled from "styled-components";
import Navbar from "@/components/Landing/Navbar";
import { PageContainer } from "@/components/Landing/PageContainer";
import { useState, useEffect } from "react";
import { useStateContext } from "@/context/StateContext";
import { getUserTelegramID, setUserTelegramID } from "@/backend/Database";

export default function Notifcations() {

    const { user } = useStateContext();
    const [telegramID, setTelegramID] = useState("");

    // This is used so that if a user already has a valid id, it will autofill the textbox
    const [telegramIDInput, setTelegramIDInput] = useState("");


    useEffect(() => {
        const fetchTelegramID = async () => {
            if (!user) return;

            const id = await getUserTelegramID(user);
            if (id) {
                setTelegramID(id);
                setTelegramIDInput(id);
            }
        }
        fetchTelegramID();
    }, [user])
    
    const handleSave = async () => {
        if (!user || !telegramIDInput) return;

        try {
            await setUserTelegramID(user, telegramIDInput);
            setTelegramID(telegramIDInput);
            alert("Telegram ID Updated");
        } catch (error) {
            console.error("Error updating Telegram ID: ", error);
        }
    };


    return (
        <>
            <Navbar />
            <PageContainer>
                <CardContainer>
                    <CardForm>
                        <CardTitle>Configure Post Notifications</CardTitle>
                        <FormBlock>
                            <CardLabel>Enter your Telegram ID:</CardLabel>
                            <CardInput value={telegramIDInput} onChange={(e) => setTelegramIDInput(e.target.value)}></CardInput>
                            <SaveButton onClick={handleSave}>
                                Save
                            </SaveButton>
                        </FormBlock>
                        <FormBlock>
                        </FormBlock>
                    </CardForm>
                </CardContainer>
            </PageContainer>
        </>
    );
}

const CardContainer = styled.div`
    background-color: #201d24;
    margin-top: 10vh;
    width: 25rem;
    max-height: fit-content;
    border-radius: 7px;
    box-shadow: 0px 3px 10px -2px black;
    padding-bottom: 20px;
`;

const CardForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const CardTitle = styled.h2`
    margin: 25px 25px 0px;
`;

const CardLabel = styled.label`
    margin: 35px 25px 5px;
`;

const CardInput = styled.input`
    display: block;
    width: 19rem;
    margin: 10px 25px 0px;
    padding: 16px;
    border-radius: 15px;
    border-color: rgb(67, 111, 182);
    border-width: 3px;
    color: inherit;
    background-color: #17151a;
    font-size: 16px;
`;

const FormBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
`;

const SaveButton = styled.button`
    display: block;
    background-color: rgb(81, 138, 227);
    padding: 10px 50px;
    margin: 35px 25px 0px;
    font-weight: 550;
    font-size: 15px;
    border-color: rgb(81, 138, 227);
    border-radius: 0.2rem;
    width: 21.5rem;
    color: inherit;
    transition: background-color 0.2s;    
    
    &:hover {
        background: #1074a3;
    }
`;

