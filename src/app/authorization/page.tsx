"use client";
import Form from "next/form";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import userAuthValidator from "@/app/validators/auth.validator";

const AuthorizationPage = () => {
    const {register, formState: {errors, isValid}} = useForm({
        mode: 'all',
        resolver: joiResolver(userAuthValidator),
    });


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