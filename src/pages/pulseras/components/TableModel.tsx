import React, { useMemo } from 'react';
import { IBracelet } from '../../../interfaces/bracelets';
import { Tag, Table, Spin, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTable, List, NumberField } from '@refinedev/antd';
import { HttpError, useDelete, useList } from '@refinedev/core';
import { style } from 'typestyle';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { IModelo, Color } from '../../../interfaces/Modelos';

interface TableModelProps {
  showDrawer: () => void;
}

export const TableModel: React.FC<TableModelProps> = ({ showDrawer }) => {
  // Hooks
  const { tableQueryResult } = useTable<IBracelet, HttpError>({
    dataProviderName: 'api',
  });
  const { mutate: deleteMutation } = useDelete();
  const { data: models } = useList<IModelo, HttpError>({
    resource: 'modelos',
  });

  // Data
  const { isLoading, data } = tableQueryResult;
  const bracelets: IBracelet[] | undefined = data?.data;

  // Methods
  const deleteBraceletById = async (id: string) => {
    try {
      await deleteMutation({
        resource: 'bracelets',
        id: id,
      });
    } catch (error) {
      console.error('Error deleting bracelet:', error);
    }
  };

  const getModelNameById = (id: string) => {
    const model: IModelo | undefined = models?.data?.find((model: any) => model._id === id);
    return model?.name;
  };

  const Colors: Map<string, Color> = useMemo(() => {
    const colorMap = new Map<string, Color>();
    models?.data?.forEach((model: IModelo) => {
      model.color.forEach((color: Color) => {
        colorMap.set(color._id, color);
      });
    });
    return colorMap;
  }, [models?.data]);

  const getColorById = (id: string) => {
    return Colors.get(id);
  };

  const ColorOptions = useMemo(() => {
    const allColors = bracelets?.map((item) => item.color) || [];
    const uniqueColors = [...new Set(allColors)];

    return uniqueColors.map((colorId) => {
      const color = getColorById(colorId);
      return {
        text: color?.name || '',
        value: color?.hex || '',
      };
    });
  }, [bracelets, getColorById]);

  // Options
  const columns: ColumnsType<IBracelet> = [
    {
      title: 'Modelo',
      dataIndex: 'model',
      key: 'model',
      filterMode: 'tree',
      filters: [...new Set(bracelets?.map((bracelet) => bracelet.model))].map((model) => ({
        text: `Modelo ${model}`,
        value: model,
      })),
      onFilter: (value, record) => record.model === value,
      render: (id) => `Modelo ${getModelNameById(id)}`,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price:number) => (
        <NumberField
          options={{
            currency: 'USD',
            style: 'currency',
          }}
          value={price}
        />
      ),
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      filters: ColorOptions,
      onFilter: (value, record) => record.color === value,
      render: (_, { color }) => (
        <Tag color={getColorById(color)?.hex}>{getColorById(color)?.name}</Tag>
      ),
    },
    {
      title: 'Talla',
      dataIndex: 'size',
      key: 'size',
      onFilter: (value, record) => record.size === value,
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      key: 'actions',
      render: (_, bracelet) => (
        <Button
          type="link"
          icon={<DeleteOutlined />}
          danger
          onClick={() => deleteBraceletById(bracelet._id)}
        />
      ),
    },
  ];

  return (
    <List
      headerProps={{
        extra: <Button type="primary" icon={<PlusOutlined />} onClick={showDrawer} />,
      }}
    >
      {isLoading ? (
        <div className={container}>
          <Spin />
        </div>
      ) : (
        <Table dataSource={bracelets} columns={columns} />
      )}
    </List>
  );
};

const container = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '200px',
});
