"use client";

import "@mantine/core/styles.css";
import "@mantine/core/styles/global.css";
import "@mantine/core/styles/Button.css";
import "@mantine/core/styles/Card.css";
import "@mantine/core/styles/Pagination.css";
import "../globals.css";

import { Loader, Pagination, Text } from "@mantine/core";
import { ShopCard } from "../components/card";
import { useGetProducts } from "../api/useApi";
import { Prodcut } from "../api/apiTypes";

export default function Shop() {

  const { data, error, isLoading } = useGetProducts();

  if (isLoading) {
    return (
      <div className="min-w-full min-h-mainbody flex flex-col flex-wrap p-4">
    <Loader size="xl" />
    </div>)
  }

  if (error) {
    return (
      <div className="min-w-full min-h-mainbody flex flex-col flex-wrap p-4">
    <Text>An error occurred while fetching orders</Text>;  
    </div>)
  }

  const products = data?.data.data;
  const productsCount = data?.data.count;

  return (
    <div className="min-w-full min-h-mainbody flex flex-col flex-wrap">
      <div className="grid grid-cols-4 gap-8 m-auto mt-12">
      {products.map((product: Prodcut) => {
        return (
          <ShopCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
          />
        );
      })}
      </div>
      <div className="m-auto my-8">
        <Pagination
          className="mt-4"
          value={7}
          onChange={() => console.log("Hello")}
          total={productsCount}
          color="red"
          size="md"
          radius="md"
          siblings={0}
          boundaries={1}
          withEdges
          hideWithOnePage
        />
      </div>
    </div>
  );
}
