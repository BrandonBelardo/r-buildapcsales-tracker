import Navbar from "@/components/Landing/Navbar";
import { PageContainer } from "@/components/Landing/PageContainer";
import AuthForm from "@/components/Auth/AuthForm";
import { useStateContext } from "@/context/StateContext";
import { loginUser } from "@/backend/Auth";
import { useRouter } from "next/router";

export default function Login() {
    const { user } = useStateContext();
    const router = useRouter();

    const handleLogin = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        try{
            if (user){
                throw new Error("You are already logged in.");
            }
            await loginUser(email, password);
            alert("Login successful");
            router.push('/dashboard');
            
        } catch (error){
            alert("Login failed: " + error.message);
        }

    };

    return (
        <>
            <Navbar />
            <PageContainer>
                <AuthForm title="Login" onSubmit={handleLogin} buttonText="Login" />
            </PageContainer>
        </>
    );
}