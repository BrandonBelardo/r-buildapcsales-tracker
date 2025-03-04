import Navbar from "@/components/Landing/Navbar";
import { PageContainer } from "@/components/Landing/PageContainer";
import AuthForm from "@/components/Auth/AuthForm";
import { signupUser } from "@/backend/Auth";
import { useRouter } from "next/router";
import { addUserToFirestore } from "@/backend/Database";

export default function SignUp() {
    const router = useRouter();

    const handleSignup = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;

        try{
            if (password != confirmPassword){
                throw new Error("Password doesn't match confirm password")
            }
            const user = await signupUser(email, password);
            await addUserToFirestore(user);
            alert("Signup successful");
            router.push('/dashboard');
        } catch (error){
            alert("Signup failed: " + error.message);
        }

    };
    return (
        <>
            <Navbar />
            <PageContainer>
                <AuthForm 
                    title="Sign Up" 
                    buttonText="Create Account"
                    onSubmit={handleSignup}
                    extraFields={[
                        {label: "Confirm Password:", type: "password", name: "confirmPassword", required: true}
                    ]}
                />
            </PageContainer>
        </>
    );
}
