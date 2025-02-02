"use client"; 

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../components/button";
import Input from "../components/input";
import { resetEmailSchema } from "../utils/validation";
import ErrorMessage from "../components/errorMessage";
import { redirect } from 'next/navigation'
import { resetPassword } from "../api/apiTypes";
import { UseResetUserPassword } from "../api/useApi";
import ApiErrorMessage from "../components/apiErrorMessage";
import { AxiosError } from 'axios';
import ApiSuccessMessage from "../components/apiSuccessMessage";


export default function Login() {


  useEffect(() => {
    const isLogin = localStorage?.getItem("accessToken")

    if(isLogin) {
      redirect("/students")
    }
  })

  const {mutate} = UseResetUserPassword()


  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")



  const { register, handleSubmit, formState: { errors }, } = useForm<resetPassword>({
    resolver: yupResolver(resetEmailSchema),
  });

  const onSubmit: SubmitHandler<resetPassword> = ({email}) => {

      mutate(
        {
          email: email
        },
        {onSuccess: () => {
        setErrorMessage("")
        setMessage("Password sent")
          setTimeout(() => {
            redirect('/login')
            }, 3000)
          },
        onError: (error) => {
          setMessage("")
            if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message)
        setTimeout(() => {
          setErrorMessage("")
        }, 3000);
      } else {
        setErrorMessage("An unexpected error occurred");
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
        <h2 className="text-2xl font-bold text-gray-700">Reset password</h2>

        <Input id="user" {...register("email")} placeholder="email" />
        {errors.email && <ErrorMessage message={errors.email.message}/>}

       
        
        <Button>send</Button>

        <span className="font-semibold text-blue-500">Password will be sent to email!</span>

        {message && <ApiSuccessMessage message={message} />}

        {errorMessage && <ApiErrorMessage message={errorMessage} />}
      
      </form>
    </div>
  );
}