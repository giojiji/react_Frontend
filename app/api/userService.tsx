import axios from "axios";
import { editListTypes, newList } from "./apiTypes";
import 'dotenv/config'


export async function getList(searchValue: string) {
  const accessToken = localStorage?.getItem("accessToken");

  const url = searchValue
    ? `${process.env.BASEAPIURL}/students/?searchName=${searchValue}`
    : `${process.env.BASEAPIURL}/students`; // Default URL if no search value

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
    `${process.env.BASEAPIURL}/students/add`,
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
    `${process.env.BASEAPIURL}/students/edit/${id}`,
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
    `${process.env.BASEAPIURL}/students/remove/${id}`,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
  return response;
}
