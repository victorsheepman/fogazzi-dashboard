import type { Meta, StoryObj } from '@storybook/react';
import { Description } from '../components/Description';


const meta: Meta<typeof Description> = {
  title: 'Description',
  component: Description,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
};

export default meta;
type Story = StoryObj<typeof Description>;

export const Primary: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
      title:'hola',
      id:1,
      status:'amame'
    },
  };