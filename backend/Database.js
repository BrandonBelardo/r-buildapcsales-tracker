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

export const setUserSetting = async (user, columnName, columnValue) => {
    try {
        if (!user) {
            throw new Error("Provided user is not yet intialized");
        }
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            [columnName]: columnValue,
        });
    } catch (error) {
        console.error(`Error setting ${columnName}: ${error}`);
    }

}

export const getUserSetting = async (user, columnName) => {
    try {
        if (!user || !user.uid) {
            throw new Error("Provided user is not yet initialized");
        }

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() && userSnap.data()[columnName]) {
            return userSnap.data()[columnName]; 
        } else {
            return ""; 
        }
    } catch (error) {
        console.error(`Error fetching ${columnName}: ${error}`);
        return ""; 
    }
};

export const storeLatestPost = async (posts) => {
    try {
        if (!posts) {
            return null;
        }

        const latestPost = posts[0].data; 

        const storedLastPostRef = doc(db, "post_data", "last_post");
        const storedLastPost = await getDoc(storedLastPostRef);

        if (storedLastPost.exists() && storedLastPost.data().postID === latestPost.id) {
            return null; 
        }

        await setDoc(storedLastPostRef, {
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
