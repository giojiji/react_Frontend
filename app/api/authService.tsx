/* eslint-disable @typescript-eslint/no-require-imports */
import axios from "axios";
import { loginData } from "./apiTypes";
require('dotenv').config()


export async function getUserData(data: loginData) {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASEAPIURL}/login` , data)
        return response;
    } catch (err) {
        throw err
    }
  }


  export async function postRegisterData(data: loginData) {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASEAPIURL}/register` , data)
        return response;
    } catch (err) {
        throw err
    }
  }
  

 

  




  