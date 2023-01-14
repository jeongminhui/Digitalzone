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
import NotFound from "./Components/NotFound/NotFound";

import ServiceInfo from "./Components/Service/ServiceInfo/ServiceInfo";
import TranInfo from "./Components/Transaction/TranInfo/TranInfo";


// 유저 최종 페이지 링크
import UserAddPage from "./Components/User/UserPageComponents/UserAdd/UserAddPage";
import UserListPage from "./Components/User/UserPageComponents/UserList/UserListPage";
import UserLoginPage from "./Components/User/UserPageComponents/UserLogin/UserLoginPage";
import UserMyPagePage from "./Components/User/UserPageComponents/UserMyPage/UserMyPagePage";
import UserUpdatePage from "./Components/User/UserPageComponents/UserUpdate/UserUpdatePage";


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
          path: "/transaction/:txnum",
          element: <TranInfo />,
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
          path: "/service/:blocknum",
          element: <ServiceInfo />,
        },
        {
          path: "/user",
          element: <User />,
        },
        {
          path: "/*",
          element: <NotFound />,
        },

        // 여기부턴 유저 페이지 (권한 따라 삼항 조건 넣어보려 함)
        {
          path: "/user/add",
          element: <UserAddPage />,
        },
        {
          path: "/user/list",
          element: <UserListPage />,
        },
        {
          path: "/user/login",
          element: <UserLoginPage />,
        },
        {
          path: "/user/mypage",
          element: <UserMyPagePage />,
        },
        {
          path: "/user/update",
          element: <UserUpdatePage />,
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
