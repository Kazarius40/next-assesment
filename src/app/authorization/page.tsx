"use client";
import Form from "next/form";

const AuthorizationPage = () => {

    const loginHandler = () => {

    }

    return (
        <>
            <h1>Авторизація</h1>
            <Form action={loginHandler}>
                <input/>

            </Form>
        </>
    );
};

export default AuthorizationPage;