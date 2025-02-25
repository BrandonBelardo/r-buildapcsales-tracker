import Navbar from "@/components/Landing/Navbar";
import { PageContainer } from "@/components/Landing/PageContainer";
import AuthForm from "@/components/Auth/AuthForm";

export default function SignUp() {
    return (
        <>
            <Navbar />
            <PageContainer>
                <AuthForm 
                    title="Sign Up" 
                    buttonText="Create Account"
                    extraFields={[
                        { label: "Confirm Password:", type: "password", name: "confirmPassword", required: true }
                    ]}
                />
            </PageContainer>
        </>
    );
}
