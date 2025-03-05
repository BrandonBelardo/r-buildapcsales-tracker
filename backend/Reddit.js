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
        console.log("a");
        const response = await fetch("https://www.reddit.com/r/buildapcsales/new.json");
        console.log("b");
        console.log(response);
        const data = await response.json();
        console.log("c");
        const posts = data.data.children;
        console.log("d");

        const textData = await response.text(); 
        console.log("Raw API Response:", textData)

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
};


