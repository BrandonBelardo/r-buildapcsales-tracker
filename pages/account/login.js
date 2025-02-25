import Navbar from "@/components/Landing/Navbar";
import { PageContainer } from "@/components/Landing/PageContainer";
import AuthForm from "@/components/Auth/AuthForm";

export default function Login() {
    return (
        <>
            <Navbar />
            <PageContainer>
                <AuthForm title="Login" buttonText="Login" />
            </PageContainer>
        </>
    );
}