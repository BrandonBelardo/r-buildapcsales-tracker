import { checkForNewPosts } from "@/backend/Reddit";
export default async function handler(req, res) {
    try {
        console.log("Triggering Reddit post refresh...");
        await checkForNewPosts();
        
        return res.status(200).json({ message: "Reddit posts refreshed successfully." });
    } catch (error) {
        console.error("Error refreshing Reddit posts:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}