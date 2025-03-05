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
    try {
        const response = await fetch("https://www.reddit.com/r/buildapcsales/new.json");
        const data = await response.json();
        const posts = data.data.children;

        // const newestStoredPostID = await getLatestPostID();
        // FOR TESTING
        const newestStoredPostID = "1j3lnf7";

        const newPosts = await getNewPostList(newestStoredPostID, posts);

        if (newPosts.length > 0) {
            console.log(`Found ${newPosts.length} new posts.`);
            // await storeLatestPost(posts);
            await notifyUsersByPreference(newPosts);
        } else {
            console.log("No new posts since last check.");
        }
    } catch (error) {
        console.error("Error checking for new posts:", error);
    }
};


