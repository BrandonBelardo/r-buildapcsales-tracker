import { storeLatestPost, getLatestPostID } from "@/backend/Database";
import { notifyUsersByPreference } from "@/backend/Telegram";

export const getNewPostList = async (newestStoredPostID, posts) => {
    // Given the newest recorded post id, we determine if the passed response has any
    // new posts and return them in a list
    const newPosts = [];
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].data.id !== newestStoredPostID) {
            newPosts.push(posts[i]);
        } else {
            break;
        }
    }
    return newPosts;
}

export const checkForNewPosts = async () => {
    const DEMO = true;
    /*
        In demo mode, we manually set the most recently stored post id so that
        the notification function can be demonstrated without the need to wait for
        actual new posts
        
        In production mode (set DEMO = false), the function will automatically
        store and retrieve the most recent post found after each call to the
        function
    */
    if (DEMO) {
        try {
            const response = await fetch("https://www.reddit.com/r/buildapcsales/new.json", {
                headers: {
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                    "Accept-Encoding": "gzip, deflate, br, zstd",
                    "Accept-Language": "en-US,en;q=0.5",
                    "Connection": "keep-alive",
                    "Host": "www.reddit.com",
                    "Priority": "u=0, i",
                    "Sec-Fetch-Dest": "document",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-Site": "none",
                    "Sec-Fetch-User": "?1",
                    "TE": "trailers",
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:136.0) Gecko/20100101 Firefox/136.0"
                }
            });
            
            console.log("Response Status:", response.status);
            console.log("Response Headers:", response.headers);

            const text = await response.text();
            console.log("Raw Response Body:", text); // Print the full response as text
            const data = await response.json();
            const posts = data.data.children;
            
            console.log(d)

            // Manually choose a recent post id from https://www.reddit.com/r/buildapcsales/new.json
            const newestStoredPostID = "1j3lnf7";

            const newPosts = await getNewPostList(newestStoredPostID, posts);

            if (newPosts.length > 0) {
                console.log(`Found ${newPosts.length} new posts.`);
                await notifyUsersByPreference(newPosts);
            } else {
                console.log("No new posts since last check.");
            }
        } catch (error) {
            console.error("Error checking for new posts:", error);
        }
    } else {
        try {
            const response = await fetch("https://www.reddit.com/r/buildapcsales/new.json");
            const data = await response.json();
            const posts = data.data.children;

            const newestStoredPostID = await getLatestPostID();

            const newPosts = await getNewPostList(newestStoredPostID, posts);

            if (newPosts.length > 0) {
                console.log(`Found ${newPosts.length} new posts.`);
                await storeLatestPost(posts);
                await notifyUsersByPreference(newPosts);
            } else {
                console.log("No new posts since last check.");
            }
        } catch (error) {
            console.error("Error checking for new posts:", error);
        }
    }
};


