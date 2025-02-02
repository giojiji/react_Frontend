"use client"

import React from "react";
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
import "./globals.css"
import { MainCarousel } from "./components/carousel";


export default function Home() {



  return (
    <div className="flex flex-col justify-center items-center min-h-mainbody bg-slate-300">
      <MainCarousel />
      <div className="text-center bg-white p-10 rounded-lg shadow-lg max-w-lg mb-6">
        <h1 className="text-4xl font-bold text-indigo-600">Welcome to Programing</h1>
        <p className="text-gray-600 mt-4 text-lg">
          Learn and practice React, node, Playwright, Cypress and mySQL with hands-on examples.
        </p>
        <a href="/registration" className="mt-6 inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700">
          Get Started
        </a>
      </div>
    </div>
  );
}
