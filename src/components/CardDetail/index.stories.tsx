import { StoryObj, Meta } from '@storybook/react';

import CardDetail from './index';


const meta: Meta<typeof CardDetail> = {
  title: 'CardDetail',
  component: CardDetail,
};

export default meta;

export const Primary: StoryObj<typeof CardDetail> = {
  args: {
    uuid: "a1913893-a1a9-556b-be7d-0f166dc57b99"
  },
};