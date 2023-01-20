import React, { useState } from "react";
import { Button, Modal } from "antd";
import UserAdd1 from "./UserAdd1";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import "./UserAddModal.scss";

const UserAddModal = () => {
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
  const addUserHandler = () => {
    setTimeout(() => {
      setOpen(false);
    }, 2200);
    // 모달창 닫고나서 user 새로고침
    setTimeout(() => {
      window.location.reload();
    }, 2300);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {/* <AddRoundedIcon />  */}
        사용자 추가
      </Button>
      <Modal
        open={open}
        // title="Title"
        onOk={handleOk}
        width={820}
        onCancel={handleCancel}
        footer={[]}
      >
        <UserAdd1 addUserOk={addUserHandler} />
      </Modal>
    </>
  );
};
export default UserAddModal;
