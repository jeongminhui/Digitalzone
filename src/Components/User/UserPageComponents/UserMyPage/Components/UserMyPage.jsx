import React, { useState, useEffect } from "react";
import { getAuth, updatePassword } from "firebase/auth";
import Swal from "sweetalert2";
import { useRecoilValue } from "recoil";
import { loginSelector } from "../../../../../Recoil/Selector";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import "./UserMyPage.scss";
import {
  Checkbox,
  Col,
  Form,
  Input,
  Row,
} from "antd";

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
const UserMyPage = () => {
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
              if (userpw !== '' && userpw === pwcheck) {
                  Swal.fire({
                      icon: 'success',
                      text: '비밀번호가 변경되었습니다',
                      showConfirmButton: false,
                      timer: 2000,
                  });
              } else {
                  Swal.fire({
                      icon: 'error',
                      text: '비밀번호를 확인해 주세요',
                      showConfirmButton: false,
                      timer: 2000,
                  });
              }
          })
          .catch((error) => {
              Swal.fire({
                  icon: 'error',
                  text: '비밀번호를 확인해 주세요',
                  showConfirmButton: false,
                  timer: 2000,
              });
          });
      setUserpw('');
      setPwcheck('');
  };

  // 비밀번호 조건 검사
  useEffect(() => {
    if (userpw.length > 0) {
      setUserpw((prev) => prev);
      const regexp =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g;

      const div = document.getElementsByClassName("natvaildpwsignin")[0];
      if (regexp.test(userpw)) {
        div.style.display = "none";
      } else if (userpw.trim() === "" || !regexp.test(userpw))
        div.style.display = "block";
    }
  }, [userpw]);

  // 비밀번호 확인
  useEffect(() => {
    if (pwcheck.length > 0) {
      setPwcheck((prev) => prev);

      // 이 부분 기본을 display = 'none'으로 하고 비밀번호 재확인에 focus 되면 보이게 css
      const same = document.getElementsByClassName("notsamepwsignin")[0];
      if (userpw === pwcheck) {
        same.style.display = "none";
      } else same.style.display = "block";
    }
  }, [userpw, pwcheck]);

  // 사용자 추가 실패 메시지
  const [errorMsg, setErrorMsg] = useState('');


console.log(loginUser);


  useEffect(() => {
      if (errorMsg !== '') {
          const errorPrint = async () => {
              await Swal.fire({
                  icon: 'error',
                  text: errorMsg,
                  showConfirmButton: false,
                  timer: 2000,
              });
          };
          errorPrint();
          setErrorMsg('');
      }
  }, [errorMsg]);


  return (
    <div className="MyInfoPage_top">
          <div className="MyInfoPage_top_left">
            <AccountCircleRoundedIcon sx={{ fontSize: 80 }} color="disabled" />
          </div>
          <div className="MyInfoPage_top_right">
            <h1>{loginUser.username}</h1>
            <h3>{loginUser.userteam}</h3>
          </div>
          <div>
            <span>이메일(아이디)</span>
            <span>{loginUser.userid}</span>
          </div>
      <Form
        {...formItemLayout}
      >
        <Form.Item
          name="password"
          label="비밀번호"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                const regexp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g;
                const showpw = getFieldValue("password")
                if (!value || regexp.test(showpw)) {
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
          <Input.Password className="UserMyPage_input_password" />
        </Form.Item>

        <Form.Item
                    name='confirm'
                    label='비밀번호 재확인'
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('비밀번호가 일치하지 않습니다!'));
                            },
                        }),
                    ]}
                >
                  <Input.Password className="input_password" />
        </Form.Item>
        <div>
            <button type="submit" onClick={pwChangeHandler}>
              변경
            </button> 
          </div>
          <br/>
          <br/>
          <br/>
        <Form.Item label='상세정보 접근 권한'>
        <Row>
                <Col span={8}>
                    <Checkbox defaultChecked disabled >
                        대시보드
                    </Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox defaultChecked disabled>
                        블록
                    </Checkbox>
                </Col>
                <Col span={8}>
                    {tran ? (
                    <Checkbox id='transaction' checked={tran} disabled>
                        트랜잭션
                    </Checkbox>
                        ) : (
                    <Checkbox id='transaction' checked={tran} disabled>
                        트랜잭션
                    </Checkbox>
                    )}
                </Col>
                <Col span={8}>
                    {node ? (
                    <Checkbox id='node' checked={node} disabled>
                        노드
                    </Checkbox>
                        ) : (
                    <Checkbox id='node' checked={node} disabled>
                        노드
                    </Checkbox>
                     )}
                </Col>
                <Col span={8}>
                    {serv ? (
                    <Checkbox id='service' checked={serv} disabled>
                       서비스
                    </Checkbox>
                       ) : (
                     <Checkbox id='service' checked={serv} disabled>
                        서비스
                    </Checkbox>
                    )}
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    {svcA ? (
                    <Checkbox id='service_a' checked={svcA} disabled>
                    A서비스
                    </Checkbox>
                        ) : (
                    <Checkbox id='service_a' checked={svcA} disabled>
                    A서비스
                    </Checkbox>
                    )}
                </Col>
                <Col span={8}>
                    {svcB ? (
                    <Checkbox id='service_b' checked={svcB} disabled>
                    B서비스
                    </Checkbox>
                        ) : (
                    <Checkbox id='service_b' checked={svcB} disabled>
                    B서비스
                    </Checkbox>
                    )}
                </Col>
                <Col span={8}>
                    {svcC ? (
                    <Checkbox id='service_c' checked={svcC} disabled>
                    C서비스
                    </Checkbox>
                        ) : (
                    <Checkbox id='service_c' checked={svcC} disabled>
                    C서비스
                    </Checkbox>
                    )}
            </Col>
          <Col span={8}>
               {svcD ? (
            <Checkbox id='service_d' checked={svcD} disabled>
                D서비스
            </Checkbox>
              ) : (
            <Checkbox id='service_d' checked={svcD} disabled>
                D서비스
            </Checkbox>
             )}
        </Col>
        <Col span={8}>
        {svcE ? (
            <Checkbox id='service_e' checked={svcE} disabled>
                E서비스
            </Checkbox>
        ) : (
            <Checkbox id='service_e' checked={svcE} disabled>
                E서비스
            </Checkbox>
        )}
        </Col>
        </Row>
                </Form.Item>
      </Form>
      <div>
            <span>유형</span>
            <span>{loginUser.userclass}</span>
      </div>
      <div>
            <span>등록일자</span>
            <span>{loginUser.userdate}</span>
      </div>
      <div>
            <span>상태</span>
            <span>{loginUser.userstatus}</span>
      </div>
    </div>
  );
};

export default UserMyPage;
