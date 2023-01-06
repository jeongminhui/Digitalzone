import React, { useState } from "react";
import { Button, Modal } from "antd";
// import "./Modal.scss";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const Modal1 = () => {
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
        첫번째 버튼 이름 넣는 곳
      </Button>
      <Modal
        open={open}
        // title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          // <Button key="back" onClick={handleCancel}>
          //   취소
          // </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            // onclick 이벤트는 변경 해주어야 함
            onClick={handleOk}
          >
            두번째 버튼 이름 넣는 곳
          </Button>,
        ]}
      >
        <p>내용 넣을 곳</p>
      </Modal>
    </>
  );
};
export default Modal1;
