/* eslint-disable @typescript-eslint/no-require-imports */
import axios from "axios";
import { loginData, resetPassword, PaymentData } from "./apiTypes";
require('dotenv').config()



const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEAPIURL,
});

api.interceptors.response.use(
  (response) => response, // Return response if successful
  (error) => {
    if (error.response?.status === 401) {
      console.warn("JWT expired. Logging out...");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);


export async function getUserData(data: loginData) {
    try {
        const response = await api.post(`${process.env.NEXT_PUBLIC_BASEAPIURL}/login` , data)
        return response;
    } catch (err) {
        throw err
    }
  }


  export async function postRegisterData(data: loginData) {
    try {
        const response = await api.post(`${process.env.NEXT_PUBLIC_BASEAPIURL}/register` , data)
        return response;
    } catch (err) {
        throw err
    }
  }
  
  export async function resetUserPassword(email: resetPassword) {
    try {
        const response = await api.post(`${process.env.NEXT_PUBLIC_BASEAPIURL}/reset-password` , email)
        return response;
    } catch (err) {
        throw err
    }
  }

  export async function getSelfData(id: string | null) {
    const accessToken = localStorage?.getItem("accessToken");

    try {
        const response = await api.get(`${process.env.NEXT_PUBLIC_BASEAPIURL}/self/${id}`, {
            headers: {
                Authorization: accessToken
            }
        })
        return response;
    } catch (err) {
        throw err
    }
  }

 

export async function uploadPhoto(id: string | null, photo: FormData) {
    const accessToken = localStorage?.getItem("accessToken");

  try {
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BASEAPIURL}/uploadPhoto/${id}`,
      photo, {
        headers: {
            Authorization: accessToken
        }
      }
    );
    return response;
  } catch (err) {
    throw err;
  }
}


export async function deletePhoto(id: string | null) {
    const accessToken = localStorage?.getItem("accessToken");

  try {
    const response = await api.delete(
      `${process.env.NEXT_PUBLIC_BASEAPIURL}/deletePhoto/${id}`, {
        headers: {
            Authorization: accessToken
        }
      }
    );
    return response;
  } catch (err) {
    throw err;
  }
}



export async function payment(data: PaymentData) {
  const accessToken = localStorage?.getItem("accessToken");

try {
  const response = await api.post(
    `${process.env.NEXT_PUBLIC_BASEAPIURL}/pay/`, data, {
      headers: {
          Authorization: accessToken
      }
    }
  );
  return response;
} catch (err) {
  throw err;
}
}




export async function getMyOrders() {
  const accessToken = localStorage?.getItem("accessToken");

try {
  const response = await api.get(
    `${process.env.NEXT_PUBLIC_BASEAPIURL}/myorders`, {
      headers: {
          Authorization: accessToken
      }
    }
  );
  return response;
} catch (err) {
  throw err;
}
}




export async function getProducts() {

try {
  const response = await api.get(
    `${process.env.NEXT_PUBLIC_BASEAPIURL}/products`
  );
  return response;
} catch (err) {
  throw err;
}
}



export async function updateOrder(session_id: string) {
  const accessToken = localStorage?.getItem("accessToken");

try {
  const response = await api.get(
    `${process.env.NEXT_PUBLIC_BASEAPIURL}/orders/${session_id}`, {
      headers: {
          Authorization: accessToken
      }
    }
  );
  return response;
} catch (err) {
  throw err;
}
}

  




  