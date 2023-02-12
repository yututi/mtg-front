import { StoryObj, Meta } from '@storybook/react';

import CardDetail from './index';


const meta: Meta<typeof CardDetail> = {
  title: 'Example/Button',
  component: CardDetail,
};

export default meta;

export const Primary: StoryObj<typeof CardDetail> = {
  args: {
    card: {
      name: "最強のカード",
      uuid: "a1913893-a1a9-556b-be7d-0f166dc57b99",
      manaCost: "{99}",
      rarity: "common",
      setCode: "one"
    }
  },
};