import UserAdd from "./Components/UserAdd";
import UserAddModal from "./Components/UserAddModal";
import React, { useState } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Checkbox,
  Row,
  Col,
} from "antd";

const UserAdd_Page = () => {
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <div>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item
          name="radio-button"
          label="유형"
          // rules={[
          //   {
          //     required: true,
          //     message: "유형을 선택해주세요!",
          //   },
          // ]}
        >
          <Radio.Group>
            <Radio.Button value="a">관리자</Radio.Button>
            <Radio.Button value="b">사용자</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="이름">
          <Input />
        </Form.Item>
        <Form.Item label="소속">
          <Input />
        </Form.Item>
        <Form.Item label="아이디">
          {/* <Form.Item label="아이디(이메일)"> */}
          <Input />@
          <Input />
          <Select>
            <Select.Option value="type">직접입력</Select.Option>
            <Select.Option value="gmail.com">gmail.com</Select.Option>
            <Select.Option value="naver.com">naver.com</Select.Option>
            <Select.Option value="nate.com">nate.com</Select.Option>
            <Select.Option value="hanmail.net">hanmail.net</Select.Option>
            <Select.Option value="kakao.com">kakao.com</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="password"
          label="비밀번호"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === "ss") {
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
          <Input.Password className="input_password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="비밀번호 재확인"
          dependencies={["password"]}
          hasFeedback
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("비밀번호가 일치하지 않습니다!")
                );
              },
            }),
          ]}
        >
          {" "}
          <Input.Password className="input_password" />
        </Form.Item>
        <Form.Item name="checkbox-group" label="권한">
          <Checkbox.Group>
            <Row>
              <Col span={8}>
                <Checkbox
                  value="B"
                  style={{
                    lineHeight: "32px",
                  }}
                  disabled
                >
                  대시보드
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="C"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  블록
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="D"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  트랜잭션
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="E"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  노드
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="F"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  서비스
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item name="checkbox-group" label="이용중인 서비스">
          <Checkbox.Group>
            <Row>
              <Col span={8}>
                <Checkbox
                  value="A"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  A서비스
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="B"
                  style={{
                    lineHeight: "32px",
                  }}
                  disabled
                >
                  B서비스
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="C"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  C서비스
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="D"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  D서비스
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="E"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  E서비스
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>
      </Form>
      <hr />
      <UserAdd />
    </div>
  );
};

export default UserAdd_Page;
