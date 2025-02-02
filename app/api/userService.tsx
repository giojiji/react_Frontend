/* eslint-disable @typescript-eslint/no-require-imports */
import axios from "axios";
import { editListTypes, newList } from "./apiTypes";
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


export async function getList(searchValue: string) {
  const accessToken = localStorage?.getItem("accessToken");

  const url = searchValue
    ? `${process.env.NEXT_PUBLIC_BASEAPIURL}/students/?name=${searchValue}`
    : `${process.env.NEXT_PUBLIC_BASEAPIURL}/students`; // Default URL if no search value

  const response = await api.get(url, {
    headers: {
      Authorization: accessToken,
    },
  });
  return response;
}

export async function addList(data: newList) {
  const accessToken = localStorage?.getItem("accessToken");

  const response = await api.post(
    `${process.env.NEXT_PUBLIC_BASEAPIURL}/students/add`,
    data,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
  return response;
}

export async function editList(id: number | null, data: editListTypes) {
  const accessToken = localStorage?.getItem("accessToken");

  const response = await api.put(
    `${process.env.NEXT_PUBLIC_BASEAPIURL}/students/edit/${id}`,
    data,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
  return response;
}

export async function deleteList(id: number) {
  const accessToken = localStorage?.getItem("accessToken");

  // Use axios.delete() for the DELETE operation
  const response = await api.delete(
    `${process.env.NEXT_PUBLIC_BASEAPIURL}/students/remove/${id}`,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
  return response;
}
