import {
  Modal,
  Flex,
  Form,
  Input,
  Button,
  Typography,
  notification,
  Checkbox,
  CheckboxProps,
} from "antd";
import form from "antd/es/form";
import { type } from "os";
import React, { useEffect } from "react";
import { IForm } from "../interface";
import menuViewModel from "../menu.veiwModel";
import { observer } from "mobx-react";
import { Path } from "@/app/types/path.enum";
import { useRouter } from "next/navigation";
import { values } from "mobx";

const ModalMenu = () => {
  const { Text } = Typography;
  const [form] = Form.useForm<IForm>();
  const route = useRouter();
  useEffect(() => {
    if (menuViewModel.isOpenModalCreate) {
      form.setFieldsValue({
        name: "",
        haveOrder: true,
        price: 0,
      });
    } else {
      form.setFieldsValue({
        name: menuViewModel.itemEdit.name,
        price: menuViewModel.itemEdit.price,
        haveOrder: menuViewModel.itemEdit.haveOrder,
      });
    }
  }, [menuViewModel.isOpenModalCreate, menuViewModel.isOpenModalEdit]);

  const onFinishForm = (value: IForm) => {
    let id = menuViewModel.itemEdit.id;
    if (menuViewModel.isOpenModalCreate) {
      const values = {
        ...value,
        haveOrder: value.haveOrder,
      };
      menuViewModel.onFinishCreate(values);
    } else {
      const values = {
        ...value,
        haveOrder: value.haveOrder,
      };
      menuViewModel.onFinishEdit(id, values);
    }
  };
  const onCancel = () => {
    menuViewModel.isOpenModalCreate = false;
    menuViewModel.isOpenModalEdit = false;
  };
  const onChange: CheckboxProps["onChange"] = (e) => {
    const value = e.target.checked;

    form.setFieldsValue({ haveOrder: value });
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

          <Form.Item name="haveOrder" valuePropName="checked">
            <Checkbox onChange={onChange}>มีเมนู</Checkbox>
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
