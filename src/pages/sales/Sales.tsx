import { List, useTable } from "@refinedev/antd";
import { useList } from "@refinedev/core";
import React, { useState } from "react";
import { Button, Modal, Table, List as Lista, Typography } from "antd";
import { IBracelet } from "../../interfaces";
import { Color, IModelo } from "../../interfaces/Modelos";

export const SalesList: React.FC = () => {
  const { data: sales } = useList({
    resource: "sales",
  });
  const { data: bracelets } = useList({
    resource: "bracelets",
  });
  const { data: models } = useList({
    resource: "modelos",
  });

  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <List title="Sales" createButtonProps={{ size: "small" }}>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="_id" title="ID" />
        <Table.Column dataIndex="amount" title="Amount" />
        <Table.Column
          dataIndex="bracelets"
          title="bracelets"
          render={(value) => {
            const relatedBracelets = value.map((braceletId: string) => {
              const bracelet = bracelets?.data.find(
                (b) => b._id === braceletId
              );
              return bracelet;
            });

            const product = relatedBracelets.map((bracelet: IBracelet) => {
              const model = models?.data.find((b) => b._id === bracelet.model);
              return model;
            });

            const colors = product.map((model: IModelo) => {
              return model.color;
            });

            const createBraceletInfo = (bracelet: IBracelet) => {
              const model = models?.data.find((b) => b._id === bracelet.model);
              const colorObject = colors.find((color: Color[]) =>
                color.find((item) => item._id === bracelet.color)
              );
              const color = colorObject.find((color: Color) => bracelet.color);

              const colorName = color ? color.name : "Color no encontrado";

              return {
                model: model ? model.name : "Modelo no encontrado",
                color: colorName,
                size: bracelet.size,
              };
            };

            const braceletsInfo = relatedBracelets.map(createBraceletInfo);

            return (
              <>
                <Button type="primary" onClick={showModal}>
                  View product
                </Button>
                <Modal
                  title="Lista de productos"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <Lista
                    itemLayout="horizontal"
                    dataSource={braceletsInfo}
                    renderItem={(item: IBracelet, index) => (
                      <Lista.Item>
                        <Lista.Item.Meta
                          title={
                            <Typography.Title level={5}>
                              Modelo: {item.model}
                            </Typography.Title>
                          }
                          description={
                            <>
                              <Typography.Text>
                                Talla: {item.size}
                              </Typography.Text>
                              <br />
                              <Typography.Text>
                                Color: {item.color}
                              </Typography.Text>
                            </>
                          }
                        />
                      </Lista.Item>
                    )}
                  />
                </Modal>
              </>
            );
          }}
        />
      </Table>
    </List>
  );
};
