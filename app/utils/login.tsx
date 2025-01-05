"use client"; 

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../components/button";
import Input from "../components/input";
import { loginSchema } from "./validation";
import ErrorMessage from "../components/errorMessage";
// import { credentials } from "./validCredentials";
import SuccessMessage from "../components/successMessage";
import { redirect } from 'next/navigation'
// import { useRouter } from 'next/navigation'
import store from "./reducer";
import { loginData } from "../api/apiTypes";
import { useLogin } from "../api/useApi";
import Link from "next/link";


export default function Login() {


  useEffect(() => {
    const isLogin = localStorage?.getItem("accessToken")

    if(isLogin) {
      redirect("/menu")
    }
  })

  const {mutate} = useLogin()

  // const router = useRouter()

  const [login, setLogin] = useState(false)
  const [loginMessage, setLoginMessage] = useState("")


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
        localStorage.setItem("accessToken", token)
          setTimeout(() => {
            redirect('/menu')
            // router.push('/settings')
            }, 1500)
          },
          onError: () => {
    setLoginMessage("invalid user")
        setTimeout(() => {
        setLoginMessage("")
        }, 3000);
    }
        },
      );
  

  };


  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-300">
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

        {login ? <SuccessMessage message={loginMessage}/> : <ErrorMessage message={loginMessage} />}


        <Link className="text-amber-600" href="/registration">Register!</Link>


      </form>
    </div>
  );
}