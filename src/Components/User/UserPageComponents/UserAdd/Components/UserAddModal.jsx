import React, { useState } from "react";
import { Button, Modal } from "antd";
import UserAdd1 from "./UserAdd1";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

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
        width={800}
        onCancel={handleCancel}
        footer={[]}
      >
        <UserAdd1 />
      </Modal>
    </>
  );
};
export default UserAddModal;
