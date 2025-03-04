import { doc, setDoc, getDoc, updateDoc, getDocs, collection, query, where } from "firebase/firestore"
import { database } from "./Firebase"
import { db } from "./Firebase";

export const addUserToFirestore = async (user) => {
    try {
        if (!user) {
            throw new Error("Provided user is not yet initialized");
        }
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email
            });

            console.log("User successfully added to firestore");
        }
    } catch (error) {
        console.error("Error adding user to firestore: ", error);
    }
}

export const setUserTelegramID = async (user, telegramID) => {
    try {
        if (!user) {
            throw new Error("Provided user is not yet intialized");
        }
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            telegramID: telegramID
        });
    } catch (error) {
        console.error("Error setting Telegram ID: ", error);
    }

}

export const getUserTelegramID = async (user) => {
    try {
        if (!user || !user.uid) {
            throw new Error("Provided user is not yet initialized");
        }

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() && userSnap.data().telegramID) {
            return userSnap.data().telegramID; 
        } else {
            return ""; 
        }
    } catch (error) {
        console.error("Error fetching Telegram ID: ", error);
        return ""; 
    }
};

export const storeLatestPost = async (posts) => {
    try {
        if (!posts) {
            return null;
        }

        const latestPost = posts[0].data; 

        const lastPostRef = doc(db, "post_data", "last_post");
        const lastPostSnap = await getDoc(lastPostRef);

        if (lastPostSnap.exists() && lastPostSnap.data().postID === latestPost.id) {
            return null; 
        }

        await setDoc(lastPostRef, {
            postID: latestPost.id,
            title: latestPost.title,
            url: `https://reddit.com${latestPost.permalink}`,
            timestamp: new Date(),
        });

        return latestPost;

    } catch (error) {
        console.error("Error fetching posts:", error);
        return null;
    }
};
