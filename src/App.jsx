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

// 유저 최종 페이지 링크
import UserAdd_Page from "./Components/User/UserPageComponents/UserAdd/UserAdd_Page";
import UserList_Page from "./Components/User/UserPageComponents/UserList/UserList_Page";
import UserLogin_Page from "./Components/User/UserPageComponents/UserLogin/UserLogin_Page";
import UserMyPage_Page from "./Components/User/UserPageComponents/UserMyPage/UserMyPage_Page";
import UserUpdate_Page from "./Components/User/UserPageComponents/UserUpdate/UserUpdate_Page";

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
        // 사용자 컴포넌트
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/myinfo",
          element: <MyInfoPage />,
        },
        // 여기부턴 사용자 페이지 (권한 따라 삼항 조건 넣어보려 함)
        {
          path: "/user/add",
          element: <UserAdd_Page />,
        },
        {
          path: "/user/list",
          element: <UserList_Page />,
        },
        {
          path: "/user/login",
          element: <UserLogin_Page />,
        },
        {
          path: "/user/mypage",
          element: <UserMyPage_Page />,
        },
        {
          path: "/user/update",
          element: <UserUpdate_Page />,
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
