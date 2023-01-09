import React, { useState } from "react";
import { Button, Modal } from "antd";
// import "./Modal1.scss";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const Modal1 = (props) => {
  /* 민희 메이드 모달 서식 입니다! :)
  모달이 필요한 페이지에 이 모달을 import하시고
  속성에 buttonName = {} 로 버튼 이름 넣어 주시고
  모달 안에 들어가야할 내용들은 import한 모달 의 자식 컴포넌트로 넣어주세요! 

  <Modal1> 이 안에 컴포넌트로 넣어주세요! :D </Modal1>
  */

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        {props.buttonName}
      </Button>
      <Modal
        open={open}
        // title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          [
            // <Button key="back" onClick={handleCancel}>
            //   취소
            // </Button>,
            // <Button
            //   key="submit"
            //   type="primary"
            //   loading={loading}
            //   // onclick 이벤트는 변경 해주어야 함
            //   onClick={handleOk}
            // >
            //   두번째 버튼 이름 넣는 곳
            // </Button>,
          ]
        }
      >
        {props.children}
      </Modal>
    </>
  );
};
export default Modal1;