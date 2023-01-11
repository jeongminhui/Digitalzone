import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../../../../../firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import { loginAtom } from "../../../../../Recoil/Atom";
import "./UserLogin.scss";
// 민희 추가
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import {
  unstable_HistoryRouter,
  useNavigate,
  withRouter,
} from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();
  // const history = createBrowserHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 로그인 실패 메시지
  const [errorMsg, setErrorMsg] = useState("");
  // recoil
  const [loginUser, setLoginUser] = useRecoilState(loginAtom);

  const userCollection = collection(db, "users");
  const auth = getAuth();

  const signInHandler = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const dataPrint = async () => {
          const user = userCredential.user;
          const docRef = doc(userCollection, user.uid);
          const data = await getDoc(docRef);
          const userInfo = data.data();

          setLoginUser(userInfo);
        };
        dataPrint();
        navigate("/");
        // window.history.go(-1);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            setErrorMsg("해당 사용자가 없습니다");
            break;
          case "auth/wrong-password":
            setErrorMsg("비밀번호가 일치하지 않습니다");
            break;
          case "auth/invalid-email":
            setErrorMsg("이메일 형식이 아닙니다");
            break;
          case "auth/too-many-requests":
            setErrorMsg("너무 많이 시도했습니다");
            break;
          default:
            setErrorMsg("로그인에 실패하였습니다");
        }
      });
    setEmail("");
    setPassword("");
  };
  useEffect(() => {
    if (errorMsg !== "") {
      const errorPrint = async () => {
        await Swal.fire({
          icon: "error",
          text: errorMsg,
          showConfirmButton: false,
          timer: 2000,
        });
      };
      errorPrint();
      setErrorMsg("");
    } else return;
  }, [errorMsg]);

  // 민희추가
  // const onFinish = (values) => {
  //   console.log("Received values of form: ", values);
  // };

  return (
    <>
      <Form
      // name="normal_login"
      // className="login-form"
      // initialValues={{
      //   remember: true,
      // }}
      // onFinish={onFinish}
      >
        <Form.Item>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="email"
            value={email}
            placeholder="아이디(이메일)"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            value={password}
            placeholder="비밀번호"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Item>
        {/* <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item> */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            // type="submit"
            onClick={signInHandler}
          >
            로그인
          </Button>
          {/* Or <a href="">register now!</a> */}
        </Form.Item>
      </Form>
    </>
  );
};

export default UserLogin;
