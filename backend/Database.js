import { doc, setDoc, getDoc, updateDoc, getDocs, collection, query, where } from "firebase/firestore"
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

export const setUserSetting = async (uid, columnName, columnValue) => {
    try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {
            [columnName]: columnValue,
        });
    } catch (error) {
        console.error(`Error setting ${columnName}: ${error}`);
    }

}

export const getUserSetting = async (uid, columnName) => {
    try {
        if (!uid) {
            throw new Error("Provided user is not yet initialized");
        }

        const userRef = doc(db, "users", uid);
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

export const getLatestPostID = async () => {
    try {
        const postRef = doc(db, "post_data", "last_post");
        const postSnap = await getDoc(postRef);

        if (postSnap.exists()) {
            return postSnap.data().postID;
        }
        else {
            throw new Error("No recent post found");
        }
    } catch (error) {
        console.error("Error fetching lastest post id: ", error);
    }
}

export const storeLatestPost = async (posts) => {
    try {
        if (!posts) {
            return null;
        }

        const latestPost = posts[0].data;

        const storedLastPostRef = doc(db, "post_data", "last_post");
        const storedLastPostSnap = await getDoc(storedLastPostRef);

        if (storedLastPostSnap.exists() && storedLastPostSnap.data().postID === latestPost.id) {
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

export async function getUsersFromDatabase() {
    try {
        const usersRef = collection(db, "users");
        const snapshot = await getDocs(usersRef);
        const users = [];
        snapshot.forEach(doc => {
            const user = doc.data();
            users.push(user);
        });
        return users;
    } catch (error) {
        console.error("Error fetching users from Firestore: ", error);
        return [];
    }
}


