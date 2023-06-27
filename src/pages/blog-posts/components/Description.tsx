import { Descriptions } from 'antd'
import React from 'react'


export interface DescriptionProps {
    title:string | undefined
    status:string | undefined
    id:number | undefined
}

export const Description:React.FC<DescriptionProps> = ({title, status, id}) => {
  return (
    <Descriptions title="User Info">
        <Descriptions.Item label="id">{id}</Descriptions.Item>
        <Descriptions.Item label="title">{title}</Descriptions.Item>
        <Descriptions.Item label="Live">{status}</Descriptions.Item>
    </Descriptions>
  )
}
