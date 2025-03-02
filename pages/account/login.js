import Navbar from "@/components/Landing/Navbar";
import { PageContainer } from "@/components/Landing/PageContainer";
import AuthForm from "@/components/Auth/AuthForm";
import { useStateContext } from "@/context/StateContext";
import { loginUser } from "@/backend/Auth";

export default function Login() {
    const { user } = useStateContext();

    const handleLogin = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        try{
            await loginUser(email, password);
            alert("Login successful");
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