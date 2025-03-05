import styled from "styled-components";
import Navbar from "@/components/Landing/Navbar";
import { PageContainer } from "@/components/Landing/PageContainer";
import { useState, useEffect } from "react";
import { useStateContext } from "@/context/StateContext";
import { getUserSetting, setUserSetting } from "@/backend/Database";
import Tooltip from "@/components/Tooltip";
import { useRouter } from "next/router";
import { notifyUser } from "@/backend/Telegram";

export default function Notifcations() {

    const { user } = useStateContext();
    const router = useRouter();
    /*
    These are configured in this way so that I can rig one state varaible to the
    input box and another to the actual value. This way, I can have the inputs
    be autofilled with the preferences already stored in the database.
    */
    const [telegramID, setTelegramID] = useState("");
    const [telegramIDInput, setTelegramIDInput] = useState("");
    const [includeKeywords, setIncludeKeywords] = useState("");
    const [includeKeywordsInput, setIncludeKeywordsInput] = useState("");
    const [excludeKeywords, setExcludeKeywords] = useState("");
    const [excludeKeywordsInput, setExcludeKeywordsInput] = useState("");
    const [includeTags, setIncludeTags] = useState("");
    const [includeTagsInput, setIncludeTagsInput] = useState("");

    useEffect(() => {
        if (!user) {
            alert("You can only access notification settings once you have signed in.");
            router.push('/');
        }
    }, []);

    useEffect(() => {
        const fetchNotificationSettings = async () => {
            if (!user) return;
            
            const uid = user.uid;

            const id = await getUserSetting(uid, "telegramID");
            if (id) {
                setTelegramID(id);
                setTelegramIDInput(id);
            }

            const includeKeywords = await getUserSetting(uid, "includeKeywords");
            if (includeKeywords) {
                setIncludeKeywords(includeKeywords);
                setIncludeKeywordsInput(includeKeywords);
            }

            const excludeKeywords = await getUserSetting(uid, "excludeKeywords");
            if (excludeKeywords) {
                setExcludeKeywords(excludeKeywords);
                setExcludeKeywordsInput(excludeKeywords);
            }

            const includeTags = await getUserSetting(uid, "includeTags");
            if (includeTags) {
                setIncludeTags(includeTags);
                setIncludeTagsInput(includeTags);
            }
        }
        fetchNotificationSettings();
    }, [user])

    const handleSave = async () => {
        if (!user || !(telegramIDInput || includeKeywordsInput || excludeKeywordsInput || includeTagsInput)) {
            alert("No fields entered");
        }
        
        const uid = user.uid;


        try {
            await setUserSetting(uid, "telegramID", telegramIDInput);
            setTelegramID(telegramIDInput);

            await setUserSetting(uid, "includeKeywords", includeKeywordsInput);
            setIncludeKeywords(telegramIDInput);

            await setUserSetting(uid, "excludeKeywords", excludeKeywordsInput);
            setExcludeKeywords(telegramIDInput);

            await setUserSetting(uid, "includeTags", includeTagsInput);
            setIncludeTags(telegramIDInput);

            alert("Settings updated successfully");
        } catch (error) {
            console.error("Error updating notification settings: ", error);
        }
    };
    
    const testNotification = async () => {
        notifyUser(user.uid, "If you received this, your Telegram account is properly linked.");
    };

    return (
        <>
            <Navbar />
            <PageContainer>
                <CardContainer>
                    <CardForm>
                        <CardTitle>Configure Post Notifications</CardTitle>

                        <FormBlock>
                            <CardLabel>
                                Telegram ID:
                                <Tooltip>
                                    This identifies the account to send notifications to. In your telegram app, search 
                                    for the user "RawDataBot" and click on them to start a chat. Press the "start" 
                                    button when you open the chat. Then, copy your Telegram ID from the response sent 
                                    by the bot by clicking on the text.
                                </Tooltip>
                            </CardLabel>
                            <CardInput value={telegramIDInput} onChange={(e) => setTelegramIDInput(e.target.value)}></CardInput>
                            <TestButton onClick={testNotification}>Test Notifications</TestButton>
                        </FormBlock>

                        <FormBlock>
                            <CardLabel>Include keywords:
                                <Tooltip>
                                    These are keywords that must be in the title. If you have more than one keyword, you will receive a
                                    notification if at least one of the keywords is in the post title. Separate keywords by commas.
                                </Tooltip>
                            </CardLabel>
                            <CardInput value={includeKeywordsInput} onChange={(e) => setIncludeKeywordsInput(e.target.value)}></CardInput>
                        </FormBlock>

                        <FormBlock>
                            <CardLabel>Exclude keywords:
                                <Tooltip>
                                    These are keywords that cannot be in the title. If you have more than one keyword, if any keyword
                                    appears in the title of a post, a notification will not be sent. Separate keywords by commas.
                                </Tooltip>
                            </CardLabel>
                            <CardInput value={excludeKeywordsInput} onChange={(e) => setExcludeKeywordsInput(e.target.value)}></CardInput>
                        </FormBlock>

                        <FormBlock>
                            <CardLabel>Include tags:
                                <Tooltip>
                                    A notification for a post will only be sent if the post is tagged, or flaired, with one of the tags
                                    in this list. All posts on r/buildapcsales are tagged. Some examples of tags are: Case, GPU, CPU, 
                                    Monitor, Laptop, and Motherboard. Separate tags by commas.
                                </Tooltip>
                            </CardLabel>
                            <CardInput value={includeTagsInput} onChange={(e) => setIncludeTagsInput(e.target.value)}></CardInput>
                        </FormBlock>

                        <FormBlock>
                            <SaveButton onClick={handleSave}>
                                Save Preferences
                            </SaveButton>
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
        background-color: rgb(67, 111, 182);
    }
`;

const TestButton = styled.button`
    display: block;
    background-color: rgb(81, 138, 227);
    padding: 7px;
    margin: 20px 25px 0px;
    font-weight: 550;
    font-size: 14px;
    border-color: rgb(81, 138, 227);
    border-radius: 0.2rem;
    width: 9rem;
    color: inherit;
    transition: background-color 0.2s; 
    
    &:hover {
        background-color: rgb(67, 111, 182);
    }
`

