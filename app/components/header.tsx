// Header.tsx
"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Button from "./button";
import store from "../utils/reducer";
import Link from "next/link";


export const Header = () => {
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

  const removeStorage = () => {
    store.dispatch({ type: "LOGOUT" });
    localStorage.removeItem("accessToken");
    setLoginState(false);
    redirect("/");
  };

  if (!loginState) {
    return null;
  }

  return (
    <div className="h-16 w-full bg-slate-100 flex items-center justify-between px-8 fixed top-0 left-0 z-10">
     <Link href="/"> <h1>Home</h1></Link> 
      <Button onClick={removeStorage} negative>Log Out</Button>
    </div>
  );
};
