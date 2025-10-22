import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000", // ✅ change to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});