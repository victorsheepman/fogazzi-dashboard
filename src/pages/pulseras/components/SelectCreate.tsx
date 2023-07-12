import { useSelect } from '@refinedev/antd';
import { Form, Select } from 'antd';
import React from 'react'
import { IBracelet } from '../../../interfaces';
import { getColorName } from '../../../utils/getColorName';
type BraceletWithoutId = Omit<IBracelet, '_id'>;
const { Option } = Select;
interface SelectCreateProps {
  option: keyof BraceletWithoutId 
  label:string 
  handler:(field: keyof BraceletWithoutId , value: any)=>void
  CurrentValue:number | null | undefined | string
}
export const SelectCreate:React.FC<SelectCreateProps> = ({option, label,CurrentValue, handler}) => {
    
    const { selectProps } = useSelect({
      resource: "bracelets",
      optionLabel:option,
      optionValue:option
  });
  return (
    <Form.Item label={label}>
          <Select value={CurrentValue} onChange={(value) => handler(option, value)}>
            {selectProps.options?.map(item=>(
               <Option value={item.value}>{`${label} ${colorRegex.test(item.label) ? getColorName(item.label) : item.label }`}</Option>
            ))}
          </Select>
    </Form.Item>
  )
}
