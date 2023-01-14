import React, { useState } from "react";
import { Button, Modal } from "antd";
import "./Modal1.scss";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const Modal1 = (props) => {
  /* 민희 메이드 모달 서식 입니다! :)
  모달이 필요한 페이지에 이 모달을 import하시고
  속성에 buttonName = {} 로 버튼 이름 넣어 주시고
  모달 안에 들어가야할 내용들은 import한 모달의 자식 컴포넌트로 넣어주세요! 

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
        {/* <AddRoundedIcon />  */}
        {props.buttonName}
      </Button>
      <Modal
        open={open}
        // title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        {props.children}
      </Modal>
    </>
  );
};
export default Modal1;
