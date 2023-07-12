import React, { useMemo, useState } from 'react';
import { useCreateMany, useList, HttpError } from '@refinedev/core';
import { Form, Input, Select, Button } from 'antd';
import { IBracelet } from '../../../interfaces';
import { useSelect } from '@refinedev/antd';
import { IModelo } from '../../../interfaces/Modelos';


type BraceletWithoutId = Omit<IBracelet, '_id'>;

export const CreateManyProductsForm: React.FC = () => {
  // States
  const [newBracelet, setNewBracelet] = useState<BraceletWithoutId>({
    model: '64ac82dfadd0c36a8c245501',
    color: '',
    size: 'S',
    price: 20,
    sold: false,
  });
  const [quantity, setQuantity] = useState<number>(1);

  // Hooks
  const { mutate, error, data } = useCreateMany<BraceletWithoutId>();
  const { data: models } = useList<IModelo, HttpError>({
    resource: 'modelos',
  });
  const { selectProps: selectModel } = useSelect({
    resource: 'modelos',
    optionLabel: 'name',
    optionValue: '_id',
  });
  const [form] = Form.useForm();

  // Computed
  const colors = useMemo(() => {
    const modelId = newBracelet.model;
    const model: IModelo | undefined = models?.data?.find((model: any) => model._id === modelId);
    return model?.color;
  }, [newBracelet.model]);

  // Methods
  const handleQuantityChange = (value: number | string) => {
    const quantityValue = Number(value);
    setQuantity(quantityValue);
  };

  const handleInputChange = (field: keyof BraceletWithoutId, value: any) => {
    setNewBracelet((prevBracelet) => ({ ...prevBracelet, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const modelId = newBracelet.model;
      const model = models?.data?.find((model: any) => model._id === modelId);
      if (!model) {
        throw new Error('Selected model not found');
      }
      const bracelets = Array.from({ length: quantity }, () => ({
        ...newBracelet,
        model: modelId,
        price: model.price,
      }));
      await mutate({
        resource: 'bracelets/many',
        values: bracelets,
      });
      console.log('Bracelets created successfully');
    } catch (error) {
      console.error('Error creating bracelets:', error);
    }
  };

  return (
    <div>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item label="Model">
          <Select value={newBracelet.model} onChange={(value) => handleInputChange('model', value)}>
            {selectModel.options?.map((model) => (
              <Select.Option key={model.value} value={model.value}>
                Model {model.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Color">
          <Select value={newBracelet.color} onChange={(value) => handleInputChange('color', value)}>
            {colors?.map((color) => (
              <Select.Option key={color._id} value={color._id}>
                {color.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Size">
          <Select value={newBracelet.size} onChange={(value) => handleInputChange('size', value)}>
            <Select.Option value="S">S</Select.Option>
            <Select.Option value="M">M</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Quantity">
          <Input type="number" min="1" value={quantity} onChange={(e) => handleQuantityChange(e.target.value)} />
        </Form.Item>
        <Button type="primary" style={{ width: '100%' }} htmlType="submit" disabled={quantity <= 0}>
          Create
        </Button>
      </Form>

      {error && <p>Error: {error.message}</p>}
      {data && <p>Bracelets created: {data.data.length}</p>}
    </div>
  );
};

