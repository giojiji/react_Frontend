import axios from "axios";
import { loginData } from "./apiTypes";
import 'dotenv/config'


export async function getUserData(data: loginData) {
    try {
        const response = await axios.post(`${process.env.BASEAPIURL}/login` , data)
        return response;
    } catch (err) {
        throw err
    }
  }


  export async function postRegisterData(data: loginData) {
    try {
        const response = await axios.post(`${process.env.BASEAPIURL}/register` , data)
        return response;
    } catch (err) {
        throw err
    }
  }
  

 

  




  