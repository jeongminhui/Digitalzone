import React, { useState } from "react";
import { ConfigProvider, Button, Modal } from "antd";

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
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#4669f5",
          },
        }}
      >
        <Button type="primary" onClick={showModal}>
          사용자 추가
        </Button>
        <Modal
          open={open}
          // title="Title"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              취소
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleOk}
            >
              추가
            </Button>,
          ]}
        >
          <p>내용 넣을 곳</p>
        </Modal>
      </ConfigProvider>
    </>
  );
};
export default Modal1;
