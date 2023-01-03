import React from "react";
import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Components/Root";
import DashBoard from "./Components/Dashboard/Dashboard";
import Block from "./Components/Block/Block";
import Transaction from "./Components/Transaction/Transaction";
import Node from "./Components/Node/Node";
import Service from "./Components/Service/Service";
import User from "./Components/User/User";
import BlockInfo from "./Components/Block/BlockInfo/BlockInfo";
import NodeDetail from "./Components/Node/NodeDetail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <DashBoard />,
        },
        {
          path: "/block",
          element: <Block />,
        },
        {
          path: "/block/:blocknum",
          element: <BlockInfo />,
        },
        {
          path: "/transaction",
          element: <Transaction />,
        },
        {
          path: "/node",
          element: <Node />,
        },
        {
          path: "/node/:nodename",
          element: <NodeDetail />,
        },
        {
          path: "/service",
          element: <Service />,
        },
        {
          path: "/user",
          element: <User />,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
