import { getUserSetting } from "./Database";
import { getUsersFromDatabase } from "./Database";

export const notifyUser = async (uid, message) => {
    try {
        const telegramID = await getUserSetting(uid, "telegramID");
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
    } catch (error) {
        console.error("Error notifying user: ", error.message);
    }
}

export const notifyUsersByPreference = async (newPosts) => {
    const users = await getUsersFromDatabase(); // Retrieve all users from Firestore

    for (const user of users) {
        const { includeKeywords, excludeKeywords, includeTags, telegramID, uid } = user;

        if (!telegramID || !(includeKeywords || includeTags)) {
            continue;
        }

        let includeKeywordsList, excludeKeywordsList, includeTagsList = [];

        if (includeKeywords) {
            includeKeywordsList = includeKeywords.toLowerCase().split(",").map(keyword => keyword.trim());
        }
        if (excludeKeywords) {
            excludeKeywordsList = excludeKeywords.toLowerCase().split(",").map(keyword => keyword.trim());
        }
        if (includeTags) {
            includeTagsList = includeTags.toLowerCase().split(",").map(tag => tag.trim());
        }

        let matchedPosts = [];

        for (const post of newPosts) {
            const title = post.data.title.toLowerCase();
            const tag = post.data.link_flair_text.toLowerCase();

            if (includeKeywordsList.length > 0 && !includeKeywordsList.some(keyword => title.includes(keyword))) {
                continue;
            }

            if (excludeKeywordsList.length > 0 && excludeKeywordsList.some(keyword => title.includes(keyword))) {
                continue;
            }

            if (includeTagsList.length > 0 && !includeTagsList.includes(tag)) {
                continue;
            }

            matchedPosts.push(post);
        }

        if (matchedPosts.length > 0) {
            const message = matchedPosts.map(post => `*${post.data.title}*\n [View Deal](${post.data.url})`).join("\n\n");
            await notifyUser(telegramID, message);
            console.log(`Sent notification to ${uid} (${telegramID})`);
        } else {
            console.log(`No matching posts for user ${uid}`);
        }
    }
};