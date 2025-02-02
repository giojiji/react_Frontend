"use client";

import { Avatar, FileInput, MantineProvider, TextInput } from "@mantine/core";
import Button from "../components/button";
import "@mantine/core/styles.css";
import "@mantine/core/styles/Input.css";
import "@mantine/core/styles/InlineInput.css";
import { useDeletePhoto, useGetSelf, useUploadPhoto } from "../api/useApi";
import { useEffect, useState } from "react";
import useAuthRedirect from "../hooks/useAuthRedirect";
import { ProfileSkeleton } from "../components/profileSkeleton";


export default function Profile() {
  useAuthRedirect();

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage?.getItem("userId");
    setUserId(storedUserId);
  }, []);

  const { data, isLoading, refetch } = useGetSelf(userId);


  const user = data?.data;

  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const { mutate: uploadMutate } = useUploadPhoto(userId);
  const { mutate: deleteMutate } = useDeletePhoto(userId, refetch);



  const handleUploadPhoto = (e: React.FormEvent) => {
    e.preventDefault();

    if (!photoFile) {
      console.error("No file selected");
      alert("Please select a file to upload."); // Alert user for no file selected
      return;
    }

    const formData = new FormData();
    formData.append("image", photoFile);

    uploadMutate(formData, {
      onSuccess: (data) => {
        console.log("Photo uploaded successfully", data);
        setPhotoFile(null);
        refetch();
      },
      onError: (error) => {
        console.error("Error uploading photo", error);
      },
    });
  };

  const handleDeletePhoto = () => {
    deleteMutate();
  };

  if (isLoading) return <ProfileSkeleton />;


  return (
    <div className="p-10 flex flex-col justify-center items-center min-h-mainbody bg-slate-300">
      <MantineProvider>
        <div className="flex flex-col gap-2 items-left w-96 p-6 bg-white shadow-lg rounded-lg">
          <div className="flex gap-4 justify-start items-center">
            <Avatar
              variant="filled"
              radius="xl"
              size="xl"
              src={
                user?.hasPhoto
                  ? `${process.env.NEXT_PUBLIC_BASEAPIURL}/${user?.imageUrl}`
                  : null
              }
            />
            {!user?.hasPhoto ? (
              <form
                onSubmit={handleUploadPhoto}
                className="flex flex-col gap-1 max-w-48"
              >
                <FileInput
                  value={photoFile || null} // Ensure it's controlled
                  onChange={setPhotoFile} // Updates the state when a new file is selected
                  accept="image/png,image/jpeg"
                  label="Upload your profile picture"
                  placeholder="Select photo"
                  className="overflow-hidden"
                />
                <Button type="submit">Upload Photo</Button>
              </form>
            ) : (
              <Button onClick={handleDeletePhoto} negative>
                Delete Photo
              </Button>
            )}
          </div>
          <hr />
          <TextInput
            disabled
            label="Name"
            value={user?.firstName}
            color="black"
          />
          <TextInput disabled label="Surname" value={user?.lastName} />
          <TextInput disabled label="email" value={user?.email} />
          <TextInput disabled label="mobile" value={user?.mobile} />
          <hr />
          <div className="flex gap-4">
            <Button>Edit Profile</Button>
            <Button>Change Password</Button>
          </div>
        </div>
      </MantineProvider>
    </div>
  );
}
