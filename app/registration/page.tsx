"use client"; 

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationData } from "../api/apiTypes";
import Input from "../components/input";
import { registerSchema } from "../utils/validation";
import ErrorMessage from "../components/errorMessage";
import Button from "../components/button";
import { useRegister } from "../api/useApi";
import { redirect } from 'next/navigation'
import SuccessMessage from "../components/successMessage";
import { useState } from "react";



export default function Registration() {

  const  {mutate} = useRegister()

  const [registerMessage, setRegisterMessage] = useState("")


    const { register, handleSubmit, formState: { errors }, } = useForm<registrationData>({
        resolver: yupResolver(registerSchema),
      });

    const onSubmit: SubmitHandler<registrationData> = ({firstName, lastName, email, mobile ,password}) => {


      mutate({
        firstName,
        lastName,
        email,
        mobile,
        password,
      }, {onSuccess: () => {  
        setRegisterMessage("Welcome, Good luck!")
        setTimeout(() => {
          redirect('/')
          }, 1500)
        }}
    )

    };
  


    return(
        <div className="p-10 flex flex-col justify-center items-center min-h-mainbody bg-slate-300">
             <form
        className="flex flex-col gap-2 items-center w-80 p-6 bg-white shadow-lg rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold text-gray-700">Fill Information</h2>

        <Input id="firstName" {...register("firstName")} placeholder="firstName" />
        {errors.firstName && <ErrorMessage message={errors.firstName.message}/>}

        <Input id="lastName" {...register("lastName")} placeholder="lastName" />
        {errors.lastName && <ErrorMessage message={errors.lastName.message}/>}

        <Input id="email" type="email" {...register("email")} placeholder="email" />
        {errors.email && <ErrorMessage message={errors.email.message}/>}

        <Input id="mobile" {...register("mobile")} placeholder="mobile" />
        {errors.mobile && <ErrorMessage message={errors.mobile.message}/>}

        <Input id="password" {...register("password")} type="password" placeholder="Password" />
        {errors.password && <ErrorMessage message={errors.password.message}/>}

        <Button>Register</Button>


       {registerMessage && <SuccessMessage message={registerMessage}/>}

      </form>
        </div>
    )
}