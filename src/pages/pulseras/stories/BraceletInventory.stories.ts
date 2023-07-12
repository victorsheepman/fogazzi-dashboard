import type { Meta, StoryObj } from '@storybook/react';
import {BraceletInventory} from '../containers/BraceletInventory';


const meta: Meta<typeof BraceletInventory> = {
  title: 'BraceletInventory ',
  component:  BraceletInventory ,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
};

export default meta;
type Story = StoryObj<typeof  BraceletInventory>;

export const Primary: Story = {
    
};