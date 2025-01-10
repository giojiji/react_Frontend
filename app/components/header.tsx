/* eslint-disable @next/next/no-img-element */
"use client";

// import { useEffect, useState } from "react";
// import { redirect } from "next/navigation";
// import store from "../utils/reducer";
import Link from "next/link";
import Button from "./button";

// export const Header = () => {
//   const [loginState, setLoginState] = useState(false);

//   // Only run this effect on the client side
//   useEffect(() => {
//     const isLogin = Boolean(localStorage.getItem("accessToken"));
//     if (isLogin) {
//       store.dispatch({ type: "LOGIN_SUCCESS" });
//       setLoginState(store.getState());
//     }

//     const unsubscribe = store.subscribe(() => setLoginState(store.getState()));
//     return () => unsubscribe();
//   }, []);

//   const removeStorage = () => {
//     store.dispatch({ type: "LOGOUT" });
//     localStorage.removeItem("accessToken");
//     setLoginState(false);
//     redirect("/");
//   };

//   if (!loginState) {
//     return null;
//   }

//   return (
//     <div className="h-16 w-full bg-slate-100 flex items-center justify-between px-8 fixed top-0 left-0 z-10">
//      <Link href="/"> <h1>Home</h1></Link>
//       <Button onClick={removeStorage} negative>Log Out</Button>
//     </div>
//   );
// };

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import store from "../utils/reducer";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  //
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

  //

  return (
    <header className="bg-white sticky top-0 shadow-md shadow-slate-400 z-50">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/menu" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
              Product
              <ChevronDownIcon
                aria-hidden="true"
                className="size-5 flex-none text-gray-400"
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon
                        aria-hidden="true"
                        className="size-6 text-gray-600 group-hover:text-indigo-600"
                      />
                    </div>
                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className="block font-semibold text-gray-900"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    <item.icon
                      aria-hidden="true"
                      className="size-5 flex-none text-gray-400"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <a href="/menu/calendar" className="text-sm/6 font-semibold text-gray-900">
            Students
          </a>
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Test
          </a>
          <a href="/settings" className="text-sm/6 font-semibold text-gray-900">
           testSettings
          </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
          {loginState ? (
            <>
              {/* <a href="/menu" className="text-sm/6 font-semibold text-gray-900">
                Profile
              </a> */}
              <Button onClick={removeStorage} negative>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/" className="text-sm/6 font-semibold text-gray-900">
                Log in
              </Link>
              <a
                href="/registration"
                className="text-sm/6 font-semibold text-gray-900"
              >
                Sign up
              </a>
            </>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/menu" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Product
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 flex-none group-data-[open]:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <a
                 href="/menu/calendar"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Students
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Company
                </a>
              </div>

              <div className="flex flex-col gap-3">
                {loginState ? (
                  <>
                    {/* <a
                      href="/menu"
                      className="text-sm/6 font-semibold text-gray-900"
                    >
                      Profile
                    </a> */}
                    <Button onClick={removeStorage} negative>
                      Log Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/"
                      onClick={() => {
                        setMobileMenuOpen(false);
                      }}
                      className="text-sm/6 font-semibold text-gray-900"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/registration"
                      onClick={() => {
                        setMobileMenuOpen(false);
                      }}
                      className="text-sm/6 font-semibold text-gray-900"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};
