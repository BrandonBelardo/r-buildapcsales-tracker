import { checkForNewPosts } from "@/backend/Reddit";
export default async function handler(req, res) {
    /*
        This api route must be called at an interval externally for new post polling and
        notifications to work. To accomplish this, I use cron-job.org which is setup to
        request this endpoint on a 5 minute interval.
    */
    try {
        console.log("Triggering Reddit post refresh...");
        await checkForNewPosts();
        
        return res.status(200).json({ message: "Reddit posts refreshed successfully." });
    } catch (error) {
        console.error("Error refreshing Reddit posts:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}