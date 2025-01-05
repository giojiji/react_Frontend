"use client";

import useAuthRedirect from "../hooks/useAuthRedirect";
import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { Button, Group, Input, MantineProvider } from "@mantine/core";
import "dayjs/locale/ka";
import '@mantine/core/styles.css';
import "@mantine/core/styles/UnstyledButton.css";
import "@mantine/core/styles/ScrollArea.css";
import "@mantine/core/styles/VisuallyHidden.css";
import "@mantine/core/styles/Paper.css";
import "@mantine/core/styles/Popover.css";
import "@mantine/core/styles/CloseButton.css";
import "@mantine/core/styles/Group.css";
import "@mantine/core/styles/Loader.css";
import "@mantine/core/styles/Overlay.css";
import "@mantine/core/styles/ModalBase.css";
import "@mantine/core/styles/Input.css";
import "@mantine/core/styles/InlineInput.css";
import "@mantine/core/styles/Flex.css";
import "@mantine/core/styles/global.css";
import "@mantine/core/styles/Button.css";
import "@mantine/core/styles/NavLink.css";

import Form from "../components/form";
import Main from "../components/main";


export default function Menu() {
  useAuthRedirect();

  const [StartValue, setStartValue] = useState<Date | null>(null);
  const [endValue, setEndValue] = useState<Date | null>(null);
  const [rangeValue, setRangeValue] = useState<[Date | null, Date | null]>([null, null]);



  return (

<Main>

      <Form />

      <MantineProvider >
        <Group justify="end" align="end" display="flex">
        <DatePickerInput
        size="xs"
          className="w-56"
          label="Start Date"
          placeholder="Pick date"
          value={StartValue}
          onChange={setStartValue}
          hideOutsideDates
        />
        <DatePickerInput
          className="w-56"
          label="End Date"
          placeholder="Pick date"
          value={endValue}
          onChange={setEndValue}
          hideOutsideDates
        />
<Input  error="Something went wrong"/>
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
              <Button onClick={() => {console.log("gio")}} variant="filled">Button</Button>
              </Group>
      </MantineProvider>

     
      </Main>

  );
}
