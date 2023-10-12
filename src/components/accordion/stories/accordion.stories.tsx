import { Meta } from '@storybook/react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '../src';

const meta = {
  title: 'Components / Disclosure / Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;

/**
 * By default, only one accordion can be visible
 * at a time, and it can't be toggled.
 *
 * Note 🚨: Each accordion button must be wrapped in a heading tag,
 * that is appropriate for the information architecture of the page.
 */
export const Basic = () => (
  <Accordion className="min-w-xs">
    <AccordionItem>
      <AccordionButton>
        Hello You awesome brick.
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>Hello!</AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionButton>
        Hello You awesome brick.
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>Hello!</AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionButton>
        Hello You awesome brick.
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>Hello!</AccordionPanel>
    </AccordionItem>
  </Accordion>
);
