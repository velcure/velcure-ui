import { Button } from '#/components/button/src';
import { Meta } from '@storybook/react';
import { useState } from 'react';
import { FaSearch, FaTruck, FaUndoAlt, FaUnlink } from 'react-icons/fa';
import {
  Menu,
  MenuGroup,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  MenuTrigger,
} from '../src';

const meta = {
  title: 'Components / Overlay / Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>;

export default meta;

const words = [
  'About Visual Studio Code',
  'Check for updates',
  'Preferences',
  'Services',
  'Hide Visual Studio Code',
  'Show All',
];

function logEvents(e: React.MouseEvent | React.KeyboardEvent | undefined) {
  if (e && e.persist) {
    // Stop React from complaining about non-persisting events.
    e.persist();
  }
  console.log(e);
}

export const basic = () => (
  <div>
    <Menu>
      <MenuTrigger>
        <Button type="button">Open</Button>
      </MenuTrigger>
      <MenuList>
        {words.map((word) => (
          <MenuItem key={word} onClick={logEvents}>
            {word}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  </div>
);

export const WithDisabledItem = () => (
  <>
    <Menu>
      <MenuTrigger>
        <Button size="sm">Open menu</Button>
      </MenuTrigger>
      <MenuList>
        <MenuItem as="a" href="#" icon={<FaSearch />} command="⌥T">
          <span>Search</span>
        </MenuItem>
        <MenuItem icon={<FaUndoAlt />}>Undo</MenuItem>
        <MenuItem icon={<FaTruck />}>Delivery</MenuItem>
        <MenuItem isDisabled icon={<FaUnlink />}>
          Unlink
        </MenuItem>
      </MenuList>
    </Menu>

    <Menu>
      <MenuTrigger>
        <Button size="sm">Open menu</Button>
      </MenuTrigger>
      <MenuList>
        <MenuItem icon={<FaSearch />} command="⌥T">
          Search
        </MenuItem>
        <MenuItem icon={<FaUndoAlt />}>Undo</MenuItem>
        <MenuItem isDisabled icon={<FaTruck />}>
          Delivery
        </MenuItem>
        <MenuItem icon={<FaUnlink />}>Unlink</MenuItem>
      </MenuList>
    </Menu>
  </>
);

export const withGroupedItems = () => (
  <Menu>
    <MenuTrigger>
      <Button size="sm">Open menu</Button>
    </MenuTrigger>
    <MenuList>
      <MenuGroup title="Group 1">
        <MenuItem>Share...</MenuItem>
        <MenuItem>Move...</MenuItem>
      </MenuGroup>
      <MenuGroup title="Group 2">
        <MenuItem isDisabled>Rename...</MenuItem>
        <MenuItem>Delete...</MenuItem>
      </MenuGroup>
    </MenuList>
  </Menu>
);

type Vehicle = {
  label: string;
  value: string;
};

const generateMenuVehicleOptions = (count: number): Vehicle[] => {
  const options: Vehicle[] = [];

  for (let i = 0; i < count; i++) {
    options.push({
      label: `Vehicle ${i + 1}`,
      value: `vehicle-${i + 1}`,
    });
  }

  return options;
};

export const MenuOptions = () => {
  const options = generateMenuVehicleOptions(30);
  const [value, setValue] = useState(options[0].value);

  return (
    <Menu closeOnSelect={false}>
      <MenuTrigger>
        <Button className="" variant="outline" size="sm">
          {value ? `${value}` : 'Choose a vehicle'}
        </Button>
      </MenuTrigger>
      <MenuList className="max-h-72 overflow-auto">
        <MenuOptionGroup
          title="Vehicle"
          defaultValue={value}
          type="radio"
          onChange={(value) => setValue(value as string)}
        >
          {options.map((option) => (
            <MenuItemOption key={option.value} value={option.value}>
              {option.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
