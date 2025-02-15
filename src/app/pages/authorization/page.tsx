"use client";
import Form from "next/form";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import userAuthValidator from "@/app/validators/auth.validator";
import {IAuthForm} from "@/app/models/authorization/IAuthForm";
import {useRouter} from "next/navigation";
import loginWithToken from "@/app/services/auth.service";

const AuthorizationPage = () => {
    const {register, formState: {errors, isValid}} = useForm<IAuthForm>({
        mode: 'all',
        resolver: joiResolver(userAuthValidator),
    });

    const router = useRouter();

    const loginHandler = async (formData: FormData) => {

        await loginWithToken(formData);

        router.push("/")
    }

    return (
        <>
            <h1>Авторизація</h1>
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

export default AuthorizationPage;