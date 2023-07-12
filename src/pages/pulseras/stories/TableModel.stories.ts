import type { Meta, StoryObj } from '@storybook/react';
import {TableModel} from '../components';


const meta: Meta<typeof TableModel> = {
  title: 'table',
  component:  TableModel ,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
};

export default meta;
type Story = StoryObj<typeof  TableModel>;

export const Primary: Story = {
    
};