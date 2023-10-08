import { Meta } from '@storybook/react';
import { ColorSwatch, SwatchColor } from '../src';

const meta = {
  title: 'Components / Forms / Color swatch',
  component: ColorSwatch,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorSwatch>;

export default meta;

const colorPalette: SwatchColor[][] = [
  [
    { color: '#FF5733', label: 'Rot 1' },
    { color: '#FF4322', label: 'Rot 2' },
    { color: '#FF3011', label: 'Rot 3' },
    { color: '#FF1C00', label: 'Rot 4' },
    { color: '#E61700', label: 'Rot 5' },
    { color: '#CC0F00', label: 'Rot 6' },
  ],
  [
    { color: '#00FF00', label: 'Grün 1' },
    { color: '#7FFF00', label: 'Grün 2' },
    { color: '#ADFF2F', label: 'Grün 3' },
    { color: '#98FB98', label: 'Grün 4' },
    { color: '#00CC00', label: 'Grün 5' },
    { color: '#009900', label: 'Grün 6' },
  ],
  [
    { color: '#007FFF', label: 'Blau 1' },
    { color: '#1E90FF', label: 'Blau 2' },
    { color: '#87CEEB', label: 'Blau 3' },
    { color: '#B0E0E6', label: 'Blau 4' },
    { color: '#4682B4', label: 'Blau 5' },
    { color: '#4169E1', label: 'Blau 6' },
  ],
  [
    { color: '#800080', label: 'Lila 1' },
    { color: '#9932CC', label: 'Lila 2' },
    { color: '#8A2BE2', label: 'Lila 3' },
    { color: '#DA70D6', label: 'Lila 4' },
    { color: '#8000FF', label: 'Lila 5' },
    { color: '#6600CC', label: 'Lila 6' },
  ],
];

export const Basic = () => {
  return <ColorSwatch colors={colorPalette} />;
};
