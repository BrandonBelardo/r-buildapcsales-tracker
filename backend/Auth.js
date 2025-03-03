import { auth } from "./Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const loginUser = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("Login failed:", error.message);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        const currentUser = auth.currentUser;
        await signOut(auth);
        window.alert("Signed out ", currentUser);
    } catch (error) {
        console.error("Logout failed:", error.message);
        throw error;
    }
};

export const signupUser = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("Signup failed:", error.message);
        throw error;
    }
}
