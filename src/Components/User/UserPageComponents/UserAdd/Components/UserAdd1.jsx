import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Checkbox,
  Row,
  Col,
} from "antd";
import "./UserAdd1.scss";
import React, { useState, useEffect } from "react";
import { db } from "../../../../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const UserAdd1 = () => {
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  // userid
  const [emailId, setEmailId] = useState("");
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  // userteam
  const [team, setTeam] = useState("");
  // userpw
  const [password, setPassword] = useState("");
  // pwcheck
  const [pwcheck, setPwcheck] = useState("");
  // username
  const [name, setName] = useState("");
  // userclass
  const [userclass, setUserclass] = useState("관리자");
  // useradmin
  const [admin, setAdmin] = useState({
    dashboard: true,
    block: true,
    transaction: false,
    node: false,
    service: false,
  });
  // userservice
  const [userservice, setUserservice] = useState({
    service_a: false,
    service_b: false,
    service_c: false,
    service_d: false,
    service_e: false,
  });
  // 사용자 추가 실패 메시지
  const [errorMsg, setErrorMsg] = useState("");

  const [serviceCnt, setServiceCnt] = useState(0);

  const auth = getAuth();

  const checkboxes = document.getElementsByName("checkbox");

  // 권한 추가
  const adminChangeHandler = (e) => {
    setAdmin({
      ...admin,
      [e.target.id]: e.target.checked,
    });
  };

  // 서비스 권한 추가
  const serviceChangeHandler = (e) => {
    setUserservice({
      ...userservice,
      [e.target.id]: e.target.checked,
    });
    if (e.target.checked === true) setServiceCnt((prev) => prev + 1);
    else setServiceCnt((prev) => prev - 1);
  };

  // userclass 변경
  const checkedItemHandler = (e) => {
    setUserclass(e.target.value);
  };

  // 이메일 드롭다운
  const domainChangeHandler = (e) => {
    if (e.target.value !== "type") {
      setDomain(e.target.value);
    } else {
      setDomain("");
    }
  };
  const domainInput = (e) => {
    setDomain(e.target.value);
  };

  useEffect(() => {
    const useremail = emailId + "@" + domain;
    setEmail(useremail);
  }, [emailId, domain]);

  // useEffect로 동기화
  // 비밀번호 조건 검사
  // 8자 이상, 하나의 문자 및 하나의 숫자 및 하나의 특수 문자 포함
  // 대소문자 구분없이 문자를 전부 하나로 침
  useEffect(() => {
    if (password.length > 0) {
      setPassword((prev) => prev);
      const regexp =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g;

      const div = document.getElementsByClassName("natvaildpwsignup")[0];
      if (regexp.test(password)) {
        div.style.display = "none";
      } else if (password.trim() === "" || !regexp.test(password))
        div.style.display = "block";
    }
  }, [password]);

  // useEffect로 동기화
  // 비밀번호 확인
  useEffect(() => {
    if (pwcheck.length > 0) {
      setPwcheck((prev) => prev);

      // 이 부분 기본을 display = 'none'으로 하고 비밀번호 재확인에 focus 되면 보이게 css
      const same = document.getElementsByClassName("notsamepwsignup")[0];
      if (password === pwcheck) {
        same.style.display = "none";
      } else same.style.display = "block";
    }
  }, [password, pwcheck]);

  const clickHandler = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // timestamp yyyy-MM-dd
        const time = new Date(user.metadata.creationTime);
        const date = new Date(time.getTime() - time.getTimezoneOffset() * 60000)
          .toISOString()
          .split("T")[0];
        // db에 데이터 추가
        setDoc(doc(db, "users", user.uid), {
          username: name,
          userteam: team,
          userid: user.email,
          useradmin: {
            ...admin,
          },
          userservice: {
            ...userservice,
          },
          userclass: userclass,
          userdate: date,
          userstatus: "정상",
          uid: user.uid,
          serviceCnt: serviceCnt,
        });
        Swal.fire({
          icon: "success",
          text: "사용자를 추가하였습니다",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setErrorMsg("아이디가 이메일 형식이 아닙니다");
            break;
          default:
            setErrorMsg("사용자를 추가할 수 없습니다");
        }
      });
    setName("");
    setEmailId("");
    setEmail("");
    setTeam("");
    setPassword("");
    setPwcheck("");
    setServiceCnt(0);
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
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
    }
  }, [errorMsg]);

  return (
    <div className="UserAdd">
      <h1>사용자 추가</h1>
      <Form
        labelCol={{
          span: 8,
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
        <Form.Item
          name="radio-button"
          label="유형"
          // rules={[
          //   {
          //     required: true,
          //     message: "유형을 선택해주세요!",
          //   },
          // ]}
        >
          <Radio.Group>
            <Radio.Button value="a">관리자</Radio.Button>
            <Radio.Button value="b">사용자</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="이름">
          <Input />
        </Form.Item>
        <Form.Item label="소속">
          <Input />
        </Form.Item>
        {/* <Form.Item label="아이디"> */}
        <Form.Item label="아이디(이메일)">
          <div className="userID_container">
            <Input className="userID" /> @
            <Input className="userID" />
          </div>
          <Select className="userID">
            <Select.Option value="type">직접입력</Select.Option>
            <Select.Option value="gmail.com">gmail.com</Select.Option>
            <Select.Option value="naver.com">naver.com</Select.Option>
            <Select.Option value="nate.com">nate.com</Select.Option>
            <Select.Option value="hanmail.net">hanmail.net</Select.Option>
            <Select.Option value="kakao.com">kakao.com</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="password"
          label="비밀번호"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === "ss") {
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
        >
          <Input.Password className="input_password" />
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
        >
          <Input.Password className="input_password" />
        </Form.Item>
        <Form.Item label="상세정보 접근 권한">
          <Checkbox.Group>
            <Row>
              <Col span={8}>
                <Checkbox
                  value="B"
                  style={{
                    lineHeight: "32px",
                  }}
                  disabled
                >
                  대시보드
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="C"
                  style={{
                    lineHeight: "32px",
                  }}
                  disabled
                >
                  블록
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="D"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  트랜잭션
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="E"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  노드
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="F"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  서비스
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item label="이용중인 서비스">
          <Checkbox.Group>
            <Row>
              <Col span={8}>
                <Checkbox
                  value="A"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  A서비스
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="B"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  B서비스
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="C"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  C서비스
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="D"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  D서비스
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="E"
                  style={{
                    lineHeight: "32px",
                  }}
                  type="checkbox"
                  id="service_e"
                  name="checkbox"
                  onChange={serviceChangeHandler}
                >
                  E서비스
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <div className="UserAdd_footer">
          <button type="submit" className="SignUpButton" onClick={clickHandler}>
            사용자 추가
          </button>
        </div>
      </Form>
    </div>
  );
};

export default UserAdd1;
