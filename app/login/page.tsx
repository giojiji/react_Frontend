"use client"; 

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../components/button";
import Input from "../components/input";
import { loginSchema } from "../utils/validation";
import ErrorMessage from "../components/errorMessage";
import { redirect } from 'next/navigation'
import store from "../utils/reducer";
import { loginData } from "../api/apiTypes";
import { useLogin } from "../api/useApi";
import Link from "next/link";
import ApiErrorMessage from "../components/apiErrorMessage";
import { AxiosError } from 'axios';
import { useUser } from "../utils/UserContext";





export default function Login() {


  useEffect(() => {
    const isLogin = localStorage?.getItem("accessToken")

    if(isLogin) {
      redirect("/students")
    }
  })

  const {mutate} = useLogin()

  // const router = useRouter()

  const [login, setLogin] = useState(false)
  const [loginMessage, setLoginMessage] = useState("")
  const { setUser } = useUser()


  const { register, handleSubmit, formState: { errors }, } = useForm<loginData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<loginData> = ({email, password}) => {


      mutate(
        {
          email: email,
          password: password,
        },
        {onSuccess: (data) => {
          setLogin(true)
        store.dispatch({ type: 'LOGIN_SUCCESS' })
        setLoginMessage("success")
        const token = data.data.token
        const id = data.data.id
        setUser(data.data)
        localStorage.setItem("accessToken", `Bearer ${token}`)
        localStorage.setItem("userId", id)
          setTimeout(() => {
            redirect('/students')
            // router.push('/settings')
            }, 1500)
          },
        onError: (error) => {
            if (error instanceof AxiosError) {
        setLoginMessage(error.response?.data.message)
        setTimeout(() => {
        setLoginMessage("")
        }, 3000);
      } else {
        setLoginMessage("An unexpected error occurred");
      }
    }
        },
      );
  

  };


  return (
    <div className="p-10 flex flex-col justify-center items-center min-h-mainbody bg-slate-300">
     <form
        className="flex flex-col gap-2 items-center w-80 p-6 bg-white shadow-lg rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold text-gray-700">Welcome</h2>

        <Input id="user" {...register("email")} placeholder="email" />
        {errors.email && <ErrorMessage message={errors.email.message}/>}

        <Input id="password" {...register("password")} type="password" placeholder="Password" />
        {errors.password && <ErrorMessage message={errors.password.message}/>}

        <Button>Login</Button>

        {!login && <ApiErrorMessage message={loginMessage} />}


        <Link className="text-amber-600" href="/forgotPassword">Forgot password?</Link>


      </form>
    </div>
  );
}