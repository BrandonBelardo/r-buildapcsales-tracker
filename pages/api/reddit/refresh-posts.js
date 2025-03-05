import { checkForNewPosts } from "@/backend/Reddit";
export default async function handler(req, res) {
    // if (req.method !== "POST") {
    //     return res.status(405).json({ message: "Method Not Allowed" });
    // }
    try {
        console.log("Triggering Reddit post refresh...");
        await checkForNewPosts();
        
        return res.status(200).json({ message: "Reddit posts refreshed successfully." });
    } catch (error) {
        console.error("Error refreshing Reddit posts:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}