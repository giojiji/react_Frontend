/* eslint-disable @typescript-eslint/no-require-imports */
import axios from "axios";
import { editListTypes, newList } from "./apiTypes";
require('dotenv').config()



export async function getList(searchValue: string) {
  const accessToken = localStorage?.getItem("accessToken");

  const url = searchValue
    ? `${process.env.NEXT_PUBLIC_BASEAPIURL}/students/?searchName=${searchValue}`
    : `${process.env.NEXT_PUBLIC_BASEAPIURL}/students`; // Default URL if no search value

  const response = await axios.get(url, {
    headers: {
      Authorization: accessToken,
    },
  });
  return response;
}

export async function addList(data: newList) {
  const accessToken = localStorage?.getItem("accessToken");

  const response = await axios.post(
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

  const response = await axios.put(
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
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_BASEAPIURL}/students/remove/${id}`,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
  return response;
}
