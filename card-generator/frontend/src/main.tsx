import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CardView from "./CardView";
import Form from "./Form";

const router = createBrowserRouter([
  {
    path: "/cardview",
    element: <CardView />,
  },
  {
    path: "/",
    element: <Form />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
