'use client';
import Form from "next/form";
import {useForm} from "react-hook-form";
import {IAuthForm} from "@/app/models/authorization/IAuthForm";
import {joiResolver} from "@hookform/resolvers/joi";
import userAuthValidator from "@/app/validators/auth.validator";
import {useRouter} from "next/navigation";
import {loginWithToken} from "@/app/services/auth.service";
import React from "react";

export const AuthForm = () => {
    const {register, formState: {errors, isValid}} = useForm<IAuthForm>({
        mode: 'all',
        resolver: joiResolver(userAuthValidator)
    });
    const router = useRouter();
    const loginHandler = async (formData: FormData): Promise<void> => {
        await loginWithToken(formData);
        router.push("/");
    }
    return (
        <>
            <Form action={loginHandler}>

                <label>
                    <input type="text" placeholder="username" {...register("username")} />
                    {errors.username && <div>{errors.username.message}</div>}
                </label>

                <label>
                    <input type="password" placeholder="password" {...register("password")} />
                    {errors.password && <div>{errors.password.message}</div>}
                </label>

                <button disabled={!isValid}>Увійти</button>
            </Form>
        </>
    );
};