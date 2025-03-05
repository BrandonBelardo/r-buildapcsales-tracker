import { checkForNewPosts } from "@/backend/Reddit";
export default async function handler(req, res) {
    /*
        This api route must be called at an interval externally for new post polling and
        notifications to work. To accomplish this, I use cron-job.org which is setup to
        request this endpoint on a 5 minute interval.
    */
    
    // Handle CORS and options method for Vercel compatability
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    try {
        console.log("Triggering Reddit post refresh...");
        await checkForNewPosts();
        
        return res.status(200).json({ message: "Reddit posts refreshed successfully." });
    } catch (error) {
        console.error("Error refreshing Reddit posts:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}