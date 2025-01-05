"use client"; 

import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "../utils/validation";
import { MantineProvider, TextInput, Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IMaskInput } from 'react-imask';

type Inputs = {
  email: string;
  mobile: string;
};

export default function Form() {
  const { control, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: "",    // Ensures email starts as an empty string, not undefined
      mobile: "",   // Ensures mobile starts as an empty string, not undefined
    },
  });

  const onSubmit: SubmitHandler<Inputs> = ({ email, mobile }) => {
    console.log("Email:", email);
    console.log("Mobile:", mobile);
  };

  return (
    <form className="flex justify-center items-center flex-col w-80 h-80 bg-red-100"
     onSubmit={handleSubmit(onSubmit)}>
      <MantineProvider>
        
        {/* Email Input */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextInput
            size="xs"
              withAsterisk
              label="Enter Your Email"
              placeholder="your@email.com"
              {...field}
              error={errors.email?.message}
            />
          )}
        />

        {/* Phone Input */}
        <Controller
        
          name="mobile"
          control={control}
          render={({ field }) => (
             <TextInput
               withAsterisk
               size="xs"
               label="Enter Your Phone"
               description="Input description"
               error={errors.mobile?.message}
                component={IMaskInput}
                placeholder="geo number"
                {...field}
              />
          )}
        />

        {/* Date Picker Input */}
        <DatePickerInput label="Pick a date" />

        {/* Submit Button */}
        <Button color="blue" type="submit">Start</Button>

      </MantineProvider>
    </form>
  );
}
