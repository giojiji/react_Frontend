import * as yup from "yup";

export const loginSchema = yup
  .object({
    email: yup.string().required("User is required"),
    password: yup.string().required().min(8, "მოკლე პაროლი").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, "მარტივი პაროლი")
  })
  .required();

  export const registerSchema = yup
  .object({
    firstName: yup.string().required("User is required"),
    lastName: yup.string().required("User is required"),
    email: yup.string().required("User is required").email("მეილის ფორმატი არასწორი"),
    mobile: yup.string().required("User is required"),
    password: yup.string().required().min(8, "მოკლე პაროლი").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, "მარტივი პაროლი")
  })
  .required();



export const formSchema =  yup
.object({
  email: yup.string().required("მეილი is required"),
  mobile: yup.string().required().min(9, "მოკლე ნომერი")
})
.required();


export const aSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  startDate: yup
    .date()
    .required("Start date is required"),
}).required();


