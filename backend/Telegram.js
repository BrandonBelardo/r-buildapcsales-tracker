import { getUserSetting } from "./Database";
import { getUsersFromDatabase } from "./Database";

export const notifyUser = async (uid, message) => {
    const LOCAL = false;
    let base = "";
    if (LOCAL) {
        base = "http://localhost:3000"
    } else {
        base = "https://r-buildapcsales-tracker.vercel.app"
    }
    try {
        const telegramID = await getUserSetting(uid, "telegramID");
        if (!telegramID) {
            throw new Error("Telegram ID was not found.")
        }

            const response = await fetch(`${base}/api/telegram/push-notification`, {
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

        let includeKeywordsList = [], excludeKeywordsList = [], includeTagsList = [];
        
        // Get keywords by comma-separation
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
            
            // These are conditions given by the user's stored preferences that determines if the notification is sent out
            // If the code skips all of these, the notification is sent

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
            const message = matchedPosts.map(post => `*${escapeMarkdown(post.data.title)}*\n[View Deal](${post.data.url})\t\t[View Reddit Page](https://www.reddit.com${post.data.permalink})`).join("\n\n");
            await notifyUser(uid, message);
            console.log(`TelegramID of user with preferences found is ${telegramID}`)
            console.log(`Sent notification to ${uid} (${telegramID})`);
        } else {
            console.log(`No matching posts for user ${uid}`);
        }
    }
};

export function escapeMarkdown(text) {
    // Telegram api message needs to be markdown compatible,
    // so we use regex to replace reserved markdown characters
    return text.replace(/([_*\[\]()~`>#+-=|{}.!])/g, '\\$1');
}