import "./UserInsertModal.scss";
import React, { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Modal1 from "../../CommonComponents/Modal/Modal1";
import { Button, Checkbox, Form, Input } from "antd";
import UserAdd from "../FixedComponents/UserAdd/UserAdd";

const UserInsertModal = () => {
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
    <div>
      <Modal1 buttonName="사용자 추가">
        <UserAdd />
      </Modal1>
    </div>
  );
};

export default UserInsertModal;
