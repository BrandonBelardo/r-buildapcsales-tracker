import fetch from "node-fetch";
import { storeLatestPost, getLatestPostID } from "@/backend/Database";
import { notifyUsersByPreference } from "@/backend/Notifications";
import { getNewPostList } from "@/backend/Reddit";

const checkForNewPosts = async () => {
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
};

const testAlert = () => {
    alert("Polling interval function called.")
}

// Run polling every 5 minutes
const pollingIntervalInMinutes = 0.2;
setInterval(testAlert, pollingIntervalInMinutes * 60 * 1000);
testAlert();
