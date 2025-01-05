"use client";

import { MantineProvider, NavLink } from "@mantine/core";
import { IconGauge } from "@tabler/icons-react";
import '@mantine/core/styles.css';
import "@mantine/core/styles/NavLink.css";
import store from "../utils/reducer";
import { useEffect, useState } from "react";
import Link from 'next/link';


export default function Navigation() {
  const [loginState, setLoginState] = useState(false);

  // Only run this effect on the client side
  useEffect(() => {
    const isLogin = Boolean(localStorage.getItem("accessToken"));
    if (isLogin) {
      store.dispatch({ type: "LOGIN_SUCCESS" });
      setLoginState(store.getState());
    }

    const unsubscribe = store.subscribe(() => setLoginState(store.getState()));
    return () => unsubscribe();
  }, []);

  if (!loginState) {
    return null;
  }

  return (
    <div className="w-48 h-full bg-red-100 fixed top-16 left-0">
      <MantineProvider>
        <NavLink
          label="Menu"
          leftSection={<IconGauge size="1rem" stroke={1.5} />}
          childrenOffset={28}
        >
        <NavLink label="Calendar" component={Link} href="/menu/calendar" />
        <NavLink label="Settings" component={Link} href="/settings" />
        </NavLink>
      </MantineProvider>
    </div>
  );
}
