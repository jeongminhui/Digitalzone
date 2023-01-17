import { db } from "../../../../../firebase";
import { collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { userInfoSelector } from "../../../../../Recoil/Selector";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Form, Checkbox, Row, Col } from "antd";
import React, { useState, useEffect } from "react";
import "./UserUpdate.scss";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const UserUpdate = ({ updateOk }) => {
  const updateUser = useRecoilValue(userInfoSelector);
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

  const navigate = useNavigate();
  const userCollection = collection(db, "users");

  // 로그인한 사용자 정보 가져오기
  useEffect(() => {
    setUser(updateUser);
    setAdmin(user.useradmin);
    setUserservice(user.userservice);
    setServiceCnt(user.serviceCnt);
  }, [updateUser, user]);

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

  // 접근 권한 변경
  const adminChangeHandler = (e) => {
    setAdmin({
      ...admin,
      [e.target.id]: e.target.checked,
    });
  };

  // 서비스 권한 변경
  const serviceChangeHandler = (e) => {
    setUserservice({
      ...userservice,
      [e.target.id]: e.target.checked,
    });
    if (e.target.checked === true) setServiceCnt((prev) => prev + 1);
    else setServiceCnt((prev) => prev - 1);
  };

  // 변경한 정보 db에 저장
  const changeHandler = async (e) => {
    e.preventDefault();
    await updateDoc(doc(userCollection, user.uid), {
      ...user,
      useradmin: {
        ...admin,
      },
      userservice: {
        ...userservice,
      },
      serviceCnt: serviceCnt,
    });
    Swal.fire({
      icon: "success",
      text: "정보를 변경했습니다",
      showConfirmButton: false,
      timer: 2000,
    });
    setServiceCnt(0);
    // /user/list를 /user로 경로 변경할 때 같이 경로 변경
    navigate("/user");
    updateOk();
  };

  // 정보 삭제
  const deleteHandler = async (e) => {
    e.preventDefault();
    Swal.fire({
      text: "삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DA3849",
      cancelButtonColor: "#30A64A",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteUser = async () => {
          await deleteDoc(doc(db, "users", user.uid));
        };
        deleteUser();
        Swal.fire({
          icon: "success",
          text: "삭제되었습니다",
          showConfirmButton: false,
          timer: 2000,
        });
        updateOk();
      } else {
        Swal.fire({
          icon: "error",
          text: "취소되었습니다",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div className="UserUpdate">
      <div className="MyInfoPage_top">
        <div className="MyInfoPage_top_left">
          <AccountCircleRoundedIcon sx={{ fontSize: 80 }} color="disabled" />
        </div>
        <div className="MyInfoPage_top_right">
          <h1>{user.username}</h1>
          <h3>{user.userteam}</h3>
        </div>
      </div>
      <Form
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{}}
      >
        <Form.Item label="아이디(이메일)">{user.userid}</Form.Item>
        <Form.Item label="상세정보 접근 권한">
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
                onChange={adminChangeHandler}
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
                onChange={adminChangeHandler}
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
                onChange={adminChangeHandler}
              >
                서비스
              </Checkbox>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="이용중인 서비스">
          <Row>
            <Col span={8}>
              <Checkbox
                style={{
                  lineHeight: "32px",
                }}
                id="service_a"
                checked={svcA}
                onChange={serviceChangeHandler}
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
                onChange={serviceChangeHandler}
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
                onChange={serviceChangeHandler}
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
                onChange={serviceChangeHandler}
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
                onChange={serviceChangeHandler}
              >
                E서비스
              </Checkbox>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="유형">{user.userclass}</Form.Item>
        <Form.Item label="등록일자">{user.userdate}</Form.Item>
        <Form.Item label="상태">{user.userstatus}</Form.Item>
        <div className="UserAdd_footer">
          <button
            type="submit"
            onClick={changeHandler}
            style={{ cursor: "pointer" }}
          >
            정보 변경
          </button>
          <button
            type="submit"
            onClick={deleteHandler}
            style={{
              cursor: "pointer",
              // background: "#E5361E"
              background: "#88888",
            }}
          >
            사용자 삭제
          </button>
        </div>
      </Form>
    </div>
  );
};

export default UserUpdate;
