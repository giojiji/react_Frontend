'use client';

import Main from "@/app/components/main";
import {
  Button,
  MantineProvider,
  Pagination,
  Table,
  Loader,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/core/styles/NavLink.css";
import "@mantine/core/styles/Pagination.css";
import "@mantine/core/styles/Button.css";
import "@mantine/core/styles/Flex.css";
import "@mantine/core/styles/global.css";
import "@mantine/dates/styles.css";
import "@mantine/core/styles/Input.css";
import "@mantine/core/styles/InlineInput.css";
import { useEffect, useState } from "react";
import useAuthRedirect from "@/app/hooks/useAuthRedirect";
import { useList } from "@/app/api/useApi";
import { deleteList } from "@/app/api/userService";
import dayjs from "dayjs";
import "dayjs/locale/ka"; // Import Georgian locale

dayjs.locale("ka"); // Set locale to Georgian




type Element = {
  id: number;
  fullname: string;
  date: string;
}

type tableProps = {
    searchValue: string,
    editId: null | number
    setEditId: React.Dispatch<React.SetStateAction<null | number>>;
    isEdit: boolean,
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    isDataChanged: boolean;
}


export default function MyTable(props: tableProps) {
  useAuthRedirect();

  function formatDate(dateString: string) {
    return dayjs(dateString).format("DD MMMM, YYYY");
  }
  
  const { data, error, isLoading, refetch } = useList(props.searchValue);
  const listA = data?.data.data; // Assuming this is the array of items.
  const count = data?.data.count; // Assuming this is the total number of items.
  
  const pages = count > 5 ? Math.ceil(count / 5) : 1; // Calculate the number of pages based on the total count.
  

  const [activePageA, setPageA] = useState(1);

  const handleDelete = async (id: number) => {
    try {
      await deleteList(id); // Delete the item
      setPageA(1)
      refetch(); // Refetch the list to update the UI
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  useEffect(() => {
    refetch();
    setPageA(1);
  }, [props.searchValue, props.isDataChanged, refetch])

  const rows = listA
    ?.slice(activePageA * 5 - 5, activePageA * 5)
    ?.map((element: Element) => (
      <Table.Tr key={element.id}>
        <Table.Td style={{minWidth: "50px"}}>{element.id}</Table.Td>
        <Table.Td style={{minWidth: "200px"}}>{element.fullname}</Table.Td>
        <Table.Td style={{minWidth: "200px"}}>{formatDate(element.date)}</Table.Td>
        <Table.Td style={{minWidth: "200px"}}><Button onClick={() => handleDelete(element.id)}>წაშლა</Button></Table.Td>
        <Table.Td style={{minWidth: "200px"}}><Button onClick={() => {props.setIsEdit(!props.isEdit); props.setEditId(element.id) }}>
          {props.isEdit && element.id == props.editId ? "გაუქმება" : "შეცვლა"}</Button></Table.Td>
      </Table.Tr>
    ));



    
    
  if (isLoading) {
    return (
      <Main>
        <MantineProvider>
          <Loader color="blue" />
        </MantineProvider>
      </Main>
    );
  }

  if (error) {
    return <h1>{error.toString()}</h1>;
  }

  if (!listA.length) {
    return (
        <Main>
        <MantineProvider>
        <h1>No Records</h1>
        </MantineProvider>
      </Main>
    )
  }


  return (
      <MantineProvider>
        <div className="p-4 justify-between">
          <Table className="flex flex-col" withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{minWidth: "50px"}}>id</Table.Th>
                <Table.Th style={{minWidth: "200px"}}>Fullname</Table.Th>
                <Table.Th style={{minWidth: "200px"}}>Date</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rows}
            </Table.Tbody>
          </Table>
          <Pagination
          className="mt-4"
            value={activePageA}
            onChange={setPageA}
            total={pages}
            color="red"
            size={false ? "lg" : "xs"}
            radius="md"
            siblings={0}
            boundaries={1}
            withEdges
            hideWithOnePage
          />
        </div>
      </MantineProvider>
  );
}



{/* 
const [rangeValue, setRangeValue] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);


        <Group>
          <Group display="flex" align="end">
            <Text component="h1" size="lg" ta="left" fw={700} c="blue">
              მოგზაურობის პერიოდი
            </Text>
            <Input placeholder="Full Name" />
            <DatePickerInput
              className="min-w-64"
              size="xs"
              type="range"
              label="End Date"
              placeholder="Pick date"
              value={rangeValue}
              onChange={setRangeValue}
              hideOutsideDates
              locale="ka"
              valueFormat="DD MMMM, YYYY"
            />
            <Button
              onClick={() => {
                console.log("gio");
              }}
            >
              Button
            </Button>
          </Group>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>id</Table.Th>
                <Table.Th>Fullname</Table.Th>
                <Table.Th>Date</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
          <Pagination
            // value={activePageJ}
            // onChange={setPageJ}
            total={listA.count}
            color="red"
            size={false ? "lg" : "xs"}
            radius="md"
            siblings={0}
            boundaries={0}
            withEdges
          />
        </Group> */}