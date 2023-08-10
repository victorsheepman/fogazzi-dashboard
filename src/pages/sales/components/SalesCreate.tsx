import { Create, useForm, useSelect } from "@refinedev/antd";
import { HttpError, useList } from "@refinedev/core";
import React, { useMemo, useState } from "react";
import { ISales } from "../../../interfaces/sales";
import { Form, Input, Select } from "antd";
import { IModelo } from "../../../interfaces/Modelos";

interface ISalesWithoutIdCreatedAt
  extends Omit<ISales, "_id" | "createdAt" | "__v"> {}

export const SalesCreate: React.FC = () => {
  const [model, setModel] = useState<IModelo>();
  const { formProps, saveButtonProps } = useForm<ISalesWithoutIdCreatedAt>();
  const { data: models } = useList<IModelo, HttpError>({
    resource: "modelos",
  });

  const { selectProps: selectModel } = useSelect({
    resource: "bracelets",
    optionLabel: "model",
    optionValue: "_id",
  });

  const colors = useMemo(() => {
    const modelFinded: IModelo | undefined = models?.data?.find(
      (item: any) => item._id === model
    );
    return modelFinded?.color;
  }, [model]);

  return (
    <Create title="Custom Title">
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Bracelets"
          name="bracelets"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select onChange={(value) => setModel(value)}>
            {selectModel.options?.map((model) => (
              <Select.Option key={model.value} value={model.value}>
                Model {model.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Create>
  );
};
