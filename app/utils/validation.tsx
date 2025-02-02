import * as yup from "yup";

export const loginSchema = yup
  .object({
    email: yup.string().required().email("invalid email format"),
    password: yup.string().required()
  })
  .required();


  export const registerSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required().email("invalid email format"),
    mobile: yup.string().required().min(9, "Short mobile").max(9, "Long mobile"),
    password: yup.string().required().min(8, "Short password").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, "Easy password")
  })
  .required();


  export const resetEmailSchema = yup
  .object({
    email: yup.string().required().email("invalid email format")
  })
  .required();



  
export const aSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  startDate: yup
    .date()
    .required("Start date is required"),
}).required();


