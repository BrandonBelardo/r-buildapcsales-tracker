import Navbar from "@/components/Landing/Navbar";
import { PageContainer } from "@/components/Landing/PageContainer";
import AuthForm from "@/components/Auth/AuthForm";

export default function Login() {
    function handleLogin(event){
        event.preventDefault();
        alert("testing");
    }

    return (
        <>
            <Navbar />
            <PageContainer>
                <AuthForm title="Login" onSubmit={handleLogin} buttonText="Login" />
            </PageContainer>
        </>
    );
}