import { Card, Space, Statistic, Typography } from 'antd'
import React from 'react'
import { style } from 'typestyle';

const { Title } = Typography;

interface ModelCardProps {
    model: string;
    countS: number;
    countM: number;
}

export const ModelCard: React.FC<ModelCardProps> = ({ model,countM, countS }) => {
    return (
        <Card  className={cardContainer} bordered={false}>
            <div>
                <Title level={4}>Modelo {model}</Title>
                <Space size='large'>
                    <Statistic title='Talla s' value={countS}  />
                    <Statistic title='Talla m'  value={countM} />
                </Space>
            </div>
        </Card>
    );
};

const cardContainer = style(
    {
        width: 200,
        display: 'flex',
        justifyContent:'center'
    }
)

