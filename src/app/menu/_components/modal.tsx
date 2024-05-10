import { Modal, Flex, Form, Input, Button, Typography } from "antd";
import form from "antd/es/form";
import { type } from "os";
import React, { useEffect } from "react";
import { IForm } from "../interface";
import menuViewModel from "../menu.veiwModel";
import { observer } from "mobx-react";

const ModalMenu = () => {
  const { Text } = Typography;
  const [form] = Form.useForm<IForm>();
  useEffect(() => {
    if (menuViewModel.isOpenModalCreate) {
      form.setFieldsValue({
        name: "",
        price: 0,
      });
    } else {
      form.setFieldsValue({
        name: "ยำมาม่า",
        price: 50,
      });
    }
  }, [menuViewModel.isOpenModalCreate, menuViewModel.isOpenModalEdit]);

  const onFinishForm = () => {};
  const onCancel = () => {
    menuViewModel.isOpenModalCreate = false;
    menuViewModel.isOpenModalEdit = false;
  };
  return (
    <Modal
      title={
        <span
          style={{
            textTransform: "capitalize",
          }}
        >
          Create
        </span>
      }
      open={
        menuViewModel.type === "Create"
          ? menuViewModel.isOpenModalCreate
          : menuViewModel.isOpenModalEdit
      }
      onCancel={() => onCancel()}
      footer={[]}
    >
      <Flex vertical gap={18}>
        {/* <>Set a customized {type} for your.</Text> */}
        <Form form={form} layout="vertical" onFinish={onFinishForm}>
          <Form.Item
            label="รายการอาหาร"
            rules={[{ required: true, message: "Please input value" }]}
            tooltip="This is a required field"
            name="name"
          >
            <Input placeholder="input name" />
          </Form.Item>

          <Form.Item
            label={"ราคา"}
            rules={[{ required: true, message: "Please input value" }]}
            tooltip="This is a required field"
            name="price"
          >
            <Input type="number" placeholder="input value" />
          </Form.Item>

          <Flex gap={12} justify="flex-end">
            <Button key="cancel" onClick={() => onCancel()}>
              Cancel
            </Button>
            <Button key="submit" type="primary" htmlType="submit">
              Save
            </Button>
          </Flex>
        </Form>
      </Flex>
    </Modal>
  );
};

export default observer(ModalMenu);
