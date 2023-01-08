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
// user 사용자 페이지 목록
import UserDataCenter from "./Components/User/UserManagementComponents/UserDataCenter";
import LoginPage from "./Components/User/LoginPage/LoginPage";
import MyInfoPage from "./Components/User/MyInfoPage/MyInfoPage";

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
        // 여기부턴 사용자 페이지 (권한 따라 삼항 조건 넣어보려 함)
        // 컴포넌트 만들어지면 링크 바꿀 것임!
        {
          path: "/user_management",
          element: <UserDataCenter />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/myinfo",
          element: <MyInfoPage />,
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
