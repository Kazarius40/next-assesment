"use client";
import {AuthForm} from "@/app/components/authorization/AuthForm";
import './page.css'

const AuthorizationPage = () => {

    return (
        <div className="auth-page">
            <h1>Авторизація</h1>
            <AuthForm/>
        </div>
    );
};

export default AuthorizationPage;