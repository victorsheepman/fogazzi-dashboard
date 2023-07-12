import React, { useState } from 'react'
import { TableModel } from '../components'
import { Drawer } from 'antd'
import { CreateManyProductsForm } from '../components/CreateManyProductsForm';


export const Products = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
     
      <Drawer title="Crear pulcera" placement="right" onClose={onClose} open={open}>
        <CreateManyProductsForm />
      </Drawer>
    <TableModel showDrawer={showDrawer} onClose={onClose} />
   </>
  )
}
