import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRecoilValue } from "recoil";
import { loginSelector } from "../../../../../Recoil/Selector";
// 민희추가
import "./UserMyPage.scss";
import { Form, Input, Radio, Select, Checkbox, Row, Col } from "antd";
import { db } from "../../../../../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { ThemeContext } from "./../../../../Context/ThemeContext";

// 민희 추가
const { Option } = Select;
const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
// 민희 추가 끝

const UserMyPage = () => {
  // 다크모드
  const theme = useContext(ThemeContext);
  const darkmode = theme.isDarkMode;

  const loginUser = useRecoilValue(loginSelector);
  const [user, setUser] = useState({});
  // 상세정보 접근 권한
  const [admin, setAdmin] = useState({
    dashboard: true,
    block: true,
    transaction: false,
    node: false,
    service: false,
  });
  const [tran, setTran] = useState(false);
  const [node, setNode] = useState(false);
  const [serv, setServ] = useState(false);
  // 이용중인 서비스
  const [userservice, setUserservice] = useState({
    service_a: false,
    service_b: false,
    service_c: false,
    service_d: false,
    service_e: false,
  });
  const [svcA, setSvcA] = useState(false);
  const [svcB, setSvcB] = useState(false);
  const [svcC, setSvcC] = useState(false);
  const [svcD, setSvcD] = useState(false);
  const [svcE, setSvcE] = useState(false);
  // 서비스 카운트
  const [serviceCnt, setServiceCnt] = useState(0);
  // userpw
  const [userpw, setUserpw] = useState("");
  // pwcheck
  const [pwcheck, setPwcheck] = useState("");

  const [form] = Form.useForm();

  const auth = getAuth();
  const currentUser = auth.currentUser;

  // 로그인한 사용자 정보 가져오기
  useEffect(() => {
    setUser(loginUser);
    setAdmin(user.useradmin);
    setUserservice(user.userservice);
    setServiceCnt(user.serviceCnt);
  }, [loginUser, user]);

  // 접근 권한 가져오기
  useEffect(() => {
    if (admin) {
      setTran(admin.transaction);
      setNode(admin.node);
      setServ(admin.service);
    }
  }, [admin]);

  // 서비스 권한 가져오기
  useEffect(() => {
    if (userservice) {
      setSvcA(userservice.service_a);
      setSvcB(userservice.service_b);
      setSvcC(userservice.service_c);
      setSvcD(userservice.service_d);
      setSvcE(userservice.service_e);
    }
  }, [userservice]);

  // 비밀번호 변경
  const pwChangeHandler = (e) => {
    e.preventDefault();
    updatePassword(currentUser, userpw)
      .then(() => {
        if (userpw !== "" && userpw === pwcheck) {
          Swal.fire({
            icon: "success",
            text: "비밀번호가 변경되었습니다",
            showConfirmButton: false,
            timer: 2000,
            color: darkmode ? "var(--bg-color)" : "#545454",
            background: darkmode ? "var(--darkmode-color)" : "#fff",
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "비밀번호를 확인해 주세요",
            showConfirmButton: false,
            timer: 2000,
            color: darkmode ? "var(--bg-color)" : "#545454",
            background: darkmode ? "var(--darkmode-color)" : "#fff",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: "비밀번호를 확인해 주세요",
          showConfirmButton: false,
          timer: 2000,
          color: darkmode ? "var(--bg-color)" : "#545454",
          background: darkmode ? "var(--darkmode-color)" : "#fff",
        });
      });
    form.resetFields();
  };
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <Form
        form={form}
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="아이디(이메일)" className="MyInfoPage_black_txt">
          {user.userid}
        </Form.Item>
        <Form.Item
          name="password"
          label="비밀번호"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                const getPw = getFieldValue("password");
                const regexp =
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g;

                if (!value || regexp.test(getPw)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "※ 8자리 이상 영문 대 소문자, 숫자, 특수문자를 입력하세요"
                  )
                );
              },
            }),
          ]}
          hasFeedback
          className="input_password_box MyInfoPage_black_txt"
        >
          <Input.Password
            className="input_password MyInfoPage_inputBox"
            value={userpw}
            onChange={(e) => setUserpw(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="비밀번호 재확인"
          dependencies={["password"]}
          hasFeedback
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("비밀번호가 일치하지 않습니다!")
                );
              },
            }),
          ]}
          className="input_password_box MyInfoPage_black_txt"
        >
          <Input.Password
            className="input_password MyInfoPage_inputBox"
            value={pwcheck}
            onChange={(e) => setPwcheck(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="상세정보 접근 권한" className="MyInfoPage_black_txt">
          <Row>
            <Col span={8}>
              <Checkbox
                style={{
                  lineHeight: "32px",
                }}
                defaultChecked
                disabled
              >
                대시보드
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                style={{
                  lineHeight: "32px",
                }}
                defaultChecked
                disabled
              >
                블록
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                style={{
                  lineHeight: "32px",
                }}
                id="transaction"
                checked={tran}
                disabled
              >
                트랜잭션
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                style={{
                  lineHeight: "32px",
                }}
                id="node"
                checked={node}
                disabled
              >
                노드
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                style={{
                  lineHeight: "32px",
                }}
                id="service"
                checked={serv}
                disabled
              >
                서비스
              </Checkbox>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="이용중인 서비스" className="MyInfoPage_black_txt">
          <Row>
            <Col span={8}>
              <Checkbox
                style={{
                  lineHeight: "32px",
                }}
                id="service_a"
                checked={svcA}
                disabled
              >
                A서비스
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                style={{
                  lineHeight: "32px",
                }}
                id="service_b"
                checked={svcB}
                disabled
              >
                B서비스
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                style={{
                  lineHeight: "32px",
                }}
                id="service_c"
                checked={svcC}
                disabled
              >
                C서비스
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                style={{
                  lineHeight: "32px",
                }}
                id="service_d"
                checked={svcD}
                disabled
              >
                D서비스
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                style={{
                  lineHeight: "32px",
                }}
                type="checkbox"
                id="service_e"
                checked={svcE}
                disabled
              >
                E서비스
              </Checkbox>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="유형" className="MyInfoPage_black_txt">
          <label>{user.userclass}</label>
        </Form.Item>
        <Form.Item label="등록일자" className="MyInfoPage_black_txt">
          <label>{user.userdate}</label>
        </Form.Item>
        <Form.Item label="상태" className="MyInfoPage_black_txt">
          <label>{user.userstatus}</label>
        </Form.Item>
        <div className="UserAdd_footer">
          <button
            type="submit"
            onClick={pwChangeHandler}
            style={{ cursor: "pointer" }}
          >
            변경
          </button>
        </div>
      </Form>
    </>
  );
};

export default UserMyPage;
