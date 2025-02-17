"use client";

import Main from "@/app/components/main";
import {
  MantineProvider,
  TextInput,
  Autocomplete
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/core/styles/global.css";
import "@mantine/core/styles/Button.css";
import "@mantine/core/styles/NavLink.css";
import "@mantine/core/styles/Pagination.css";
import "@mantine/core/styles/Flex.css";
import "@mantine/core/styles/global.css";
import "@mantine/dates/styles.css";
import "@mantine/core/styles/Input.css";
import "@mantine/core/styles/InlineInput.css";
import "dayjs/locale/ka";
import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import useAuthRedirect from "@/app/hooks/useAuthRedirect";
import { yupResolver } from "@hookform/resolvers/yup";
import { aSchema } from "../utils/validation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAddList, useEditList } from "@/app/api/useApi";
import MyTable from "@/app/components/table";
import Button from "../components/button";
import "../globals.css"

type Inputs = {
  fullName: string;
  startDate: Date;
};

export default function Students() {
  useAuthRedirect();

  const [searchValue, setSearchValue] = useState("");

  // const { mutate, isLoading, isError, error } = useAddList();
  const { mutate } = useAddList();
  const { mutate: editMutation } = useEditList();

  // const pages = count > 5 ? Math.ceil(count / 5) : 1; // Calculate the number of pages based on the total count.

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState<null | number>(null);

  const [isDataChanged, setIsDataChanged] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(aSchema),
    defaultValues: {
      fullName: "",
      startDate: new Date(),
    },
  });

  const onSubmit: SubmitHandler<Inputs> = ({ fullName, startDate }) => {
    // const newId = Math.floor(Math.random() * 100000); // Generate a random ID
    const formattedDate = `${startDate.getFullYear()}-${
      startDate.getMonth() + 1
    }-${startDate.getDate()}`;
    if (isEdit) {
      editMutation(
        {
          id: editId,
          newTodo: {
            Fullname: fullName,
            date: formattedDate,
          },
        },
        {
          onSuccess: () => {
            setIsDataChanged(!isDataChanged)
            // refetch()
            setEditId(null);
            setIsEdit(false);
          }, // Refetch or update your list on success
        }
      );
      reset();
    } else {
      mutate(
        {
          Fullname: fullName,
          date: formattedDate,
        },
        {onSuccess: () => 
          setIsDataChanged(!isDataChanged)

          // refetch()
          }
      );
      reset();
      // setPageA(1)
    }
  };

  return (
    <Main>
      <MantineProvider>
        <div className="min-w-full min-h-mainbody flex flex-col flex-wrap">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="h-20 flex flex-wrap items-start	 justify-start md:flex-col gap-3">
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <TextInput
                    label="Full Name"
                    placeholder="Enter your full name"
                    {...field}
                    error={errors.fullName?.message}
                  />
                )}
              />
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePickerInput
                    label="Start Date"
                    placeholder="Pick a date"
                    className="w-40"
                    onChange={field.onChange}
                    value={field.value}
                    error={errors.startDate?.message}
                    locale="ka"
                    hideOutsideDates
                  />
                )}
              />
              <div className="mt-[25px] w-48">
              {isEdit ? (
                <Button  type="submit">
                  შენახვა
                </Button>
              ) : (
                <Button type="submit">
                  დამატება
                </Button>
              )}
              </div>
              <Autocomplete
                placeholder="Search person"
                className="mt-[25px] w-48"
                value={searchValue}
                onChange={setSearchValue}
              />
            </div>
          </form>
          <MyTable searchValue={searchValue} editId={editId} setEditId={setEditId} isEdit={isEdit} setIsEdit={setIsEdit}
          isDataChanged={isDataChanged}
          />
        </div>
      </MantineProvider>
    </Main>
  );
}
