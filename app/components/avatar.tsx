import { Avatar } from "@mantine/core";
import { useGetSelf } from "../api/useApi";
import Link from "next/link";

const userId = typeof window !== "undefined" ? localStorage?.getItem("userId") : null;

export const MainAvatar = () => {
  const { data } = useGetSelf(userId);
  const user = data?.data;

  return (
        <Link href="/profile">
      <Avatar
        variant="filled"
        radius="xl"
        size="md"
        src={
          user?.hasPhoto
            ? `${process.env.NEXT_PUBLIC_BASEAPIURL}/${user.imageUrl}`
            : null
        }
      />
      </Link>
  );
};
