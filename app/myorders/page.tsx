"use client";

import { Pagination, Card, Text, Group, Badge, Button, Loader } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/core/styles/global.css";
import "@mantine/core/styles/Button.css";
import '@mantine/core/styles/Card.css';
import "@mantine/core/styles/Pagination.css";
import "../globals.css";
import useAuthRedirect from "../hooks/useAuthRedirect";
import { useGetMyOrders } from "../api/useApi";
import { Order } from "../api/apiTypes";
import { updateOrder } from "../api/authService";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query"; // ✅ Import Query Client
import dayjs from "dayjs";


export default function Orders() {
  
  useAuthRedirect();
  
  const queryClient = useQueryClient(); // ✅ Get Query Client
  
  const { data, error, isLoading } = useGetMyOrders(); // ✅ Fetch Orders
  
  useEffect(() => {
    const pay_session = localStorage?.getItem("pay_session");

    if (pay_session) {
      updateOrder(pay_session).then(() => {
        localStorage.removeItem('pay_session');
        queryClient.invalidateQueries(["getMyOrders"]); // ✅ Refetch orders after update
      });
    }
  }, [queryClient]); // ✅ Dependency array includes `queryClient`

  if (isLoading) {
    return (
      <div className="min-w-full min-h-mainbody flex flex-col flex-wrap p-4">
        <Loader size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-w-full min-h-mainbody flex flex-col flex-wrap p-4">
        <Text>An error occurred while fetching orders</Text>
      </div>
    );
  }

  const orders = data?.data.data;
  const ordersCount = data?.data.count;

  return (
    <div className="min-w-full min-h-mainbody flex flex-col flex-wrap p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Your Orders</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders && orders?.map((order: Order) => (
          <Card key={order.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Group className="mt-4">
              <Text>{order.name}</Text>
              <Badge color={order.status === "pending" ? "yellow" : "green"}>
                {order.status}
              </Badge>
            </Group>

            <Text size="sm" color="dimmed" mt={10}>
              {order.description}
            </Text>

            <Group mt={10}>
              <Text size="md">
                ${order.price.toFixed(2)}
                {order.discount_percent > 0 && (
                  <span className="text-red-500 text-sm">
                    {" "}
                    (-{order.discount_percent}% off)
                  </span>
                )}
              </Text>

              <Text size="sm" color="dimmed">
                Quantity: {order.quantity}
              </Text>
              <Text size="sm" color="dimmed">
                Order date: {dayjs(order.date).format("DD-MM-YYYY HH:mm:ss")}
              </Text>
            </Group>

            <Button variant="outline" fullWidth mt={12} color="blue">
              View Details
            </Button>
          </Card>
        ))}
      </div>

      <Pagination
        className="mt-6"
        value={1}
        onChange={() => console.log("Pagination clicked")}
        total={ordersCount}
        color="red"
        size="md"
        radius="md"
        siblings={0}
        boundaries={1}
        withEdges
        hideWithOnePage
      />
    </div>
  );
}
