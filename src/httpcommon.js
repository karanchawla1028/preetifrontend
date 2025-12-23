import axios from "axios";

export const api = axios.create({
  baseURL: "/api", // use proxy
  headers: {
    "Content-Type": "application/json",
  },
});

// export const api = axios.create({
//   baseURL: "/", // ✅ change to your backend URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
