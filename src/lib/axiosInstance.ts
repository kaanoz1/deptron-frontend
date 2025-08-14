"use client";

import axios from "axios";

export const BASE_URL = process.env["NEXT_PUBLIC_API_BASE_URL"];

console.log("Process URL: ", process.env["NEXT_PUBLIC_API_BASE_URL"]);
console.log("Base URL: ", BASE_URL);

if (!BASE_URL) throw new Error("Missing baseURL");

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export default axiosInstance;
