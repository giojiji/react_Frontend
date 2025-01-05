"use client";

import { useState } from "react";
import useAuthRedirect from "../hooks/useAuthRedirect";
import { MantineProvider, Pagination } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/core/styles/Pagination.css";
import "@mantine/core/styles/NavLink.css";
import Main from "../components/main";
import "@mantine/core/styles/Input.css";
import "@mantine/core/styles/InlineInput.css";


export default function Settings() {
  useAuthRedirect();

  const [activePage, setPage] = useState(1);


  const newData = "Hello facts"



  return (
    <Main>
      <button>get resposnse</button>
      <p>{newData}</p>
      <MantineProvider>
        <Pagination
          value={activePage}
          onChange={setPage}
          total={10}
          color="red"
          size={false ? "lg" : "xs"}
          radius="md"
          siblings={0}
          boundaries={0}
          withEdges
        />
        <h1>{activePage}</h1>
      </MantineProvider>
    </Main>
  );
}
