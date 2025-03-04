import { getUserSetting } from "./Database";

export const notifyUser = async (user, message) => {
    if (!user) return;
    
    try {
        const telegramID = await getUserSetting(user, "telegramID");
        const response = await fetch('/api/telegram/push-notification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                telegramID: telegramID,
                message: message
            })
        });

        if (!response.ok) {
            console.error(await response.json())
            throw new Error("Telegram API request failed on the frontend.")
        }
    } catch (error){
        console.error("Error notifying user: ", error.message);
    }
}