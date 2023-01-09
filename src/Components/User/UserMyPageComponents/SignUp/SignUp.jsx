import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Button, Checkbox, Form, Input } from "antd";

const SignUp = () => {

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
        setName("");
        setEmailId("");
        setEmail("");
        setTeam("");
        setPassword("");
        setPwcheck("");
        setServiceCnt(0);
        checkboxes.forEach((checkbox) => (checkbox.checked = false));

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
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div>
      <form>
        <h1>사용자 추가</h1>
        <div>
          유형:
          <label>
            <input
              type="radio"
              name="type"
              value="관리자"
              onClick={checkedItemHandler}
              defaultChecked
            />
            관리자
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="사용자"
              onClick={checkedItemHandler}
            />
            사용자
          </label>
        </div>
        <div>
          이름:{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          소속:{" "}
          <input
            type="text"
            value={team}
            onChange={(e) => {
              setTeam(e.target.value);
            }}
          />
        </div>
        {/* <div>
                    아이디:{' '}
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div> */}
        <div>
          아이디:{" "}
          <input
            type="text"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
          @
          <input
            className="domainTxt"
            type="text"
            value={domain}
            onChange={domainInput}
          />
          <select className="domainList" onChange={domainChangeHandler}>
            <option value="type">직접입력</option>
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="nate.com">nate.com</option>
            <option value="hanmail.net">hanmail.net</option>
            <option value="kakao.com">kakao.com</option>
          </select>
        </div>
        <div>
          비밀번호:{" "}
          <input
            type="password"
            className="userpw"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="natvaildpwsignup" style={{ color: "#4665F9" }}>
          ※ 8자리 이상 영문 대 소문자, 숫자, 특수문자를 입력하세요
        </div>
        <div>
          비밀번호 재확인:{" "}
          <input
            type="password"
            className="userpwcheck"
            value={pwcheck}
            onChange={(e) => setPwcheck(e.target.value)}
          />
        </div>
        <div className="notsamepwsignup"> 비밀번호가 일치하지 않습니다</div>
        <div>
          권한:{" "}
          <label>
            <input type="checkbox" checked disabled />
            대시보드
          </label>
          <label>
            <input type="checkbox" checked disabled />
            블록
          </label>
          <label>
            <input
              type="checkbox"
              id="transaction"
              name="checkbox"
              onChange={adminChangeHandler}
            />
            트랜잭션
          </label>
          <label>
            <input
              type="checkbox"
              id="node"
              name="checkbox"
              onChange={adminChangeHandler}
            />
            노드
          </label>
          <label>
            <input
              type="checkbox"
              id="service"
              name="checkbox"
              onChange={adminChangeHandler}
            />
            서비스
          </label>
        </div>
        <div>
          이용중인 서비스:
          <label>
            <input
              type="checkbox"
              id="service_a"
              name="checkbox"
              onChange={serviceChangeHandler}
            />
            A서비스
          </label>
          <label>
            <input
              type="checkbox"
              id="service_b"
              name="checkbox"
              onChange={serviceChangeHandler}
            />
            B서비스
          </label>
          <label>
            <input
              type="checkbox"
              id="service_c"
              name="checkbox"
              onChange={serviceChangeHandler}
            />
            C서비스
          </label>
          <label>
            <input
              type="checkbox"
              id="service_d"
              name="checkbox"
              onChange={serviceChangeHandler}
            />
            D서비스
          </label>
          <label>
            <input
              type="checkbox"
              id="service_e"
              name="checkbox"
              onChange={serviceChangeHandler}
            />
            E서비스
          </label>
        </div>
        <button type="submit" className="SignUpButton" onClick={clickHandler}>
          사용자 추가
        </button>
      </form>
    </div>
  );
};

export default SignUp;
