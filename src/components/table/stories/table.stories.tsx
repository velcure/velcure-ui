import { Button, ButtonGroup, IconButton } from '#/components/button/src';
import { Card, CardBody, CardFooter, CardHeader } from '#/components/card/src';
import { Checkbox } from '#/components/checkbox/src';
import { SearchInput } from '#/components/input/src';
import { Menu, MenuItem, MenuList, MenuTrigger } from '#/components/menu/src';
import { Typography } from '#/components/typography/src';
import { Meta } from '@storybook/react';
import { useState } from 'react';
import { LuMoreVertical } from 'react-icons/lu';
import {
  TBody,
  TCell,
  THead,
  THeadCell,
  THeadRow,
  TableContainer,
  Tr,
} from '../src';
import { Table } from '../src/table';

const meta: Meta = {
  title: 'Components / Data Display / Table',
  component: Table,
  // parameters: {
  //   layout: 'centered',
  // },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

const TABLE_HEAD = ['Fruit', 'Sun exposure', 'Soil'];

interface IRowData {
  id: string;
  fruit: string;
  sun: string;
  soil: string;
  selected: boolean;
}

const rowData: IRowData[] = Array.from(Array(10)).map((_row, index) => ({
  id: `row-${index}`,
  fruit: `Fruit #${index}`,
  sun: 'Full sun',
  soil: 'Well draining',
  selected: false,
}));

export const Simple = () => (
  <TableContainer>
    <Table className="max-w-3xl">
      <THead>
        <THeadRow>
          {TABLE_HEAD.map((head) => (
            <THeadCell key={head}>{head}</THeadCell>
          ))}
        </THeadRow>
      </THead>
      <TBody>
        {rowData.map((body, idx) => (
          <Tr key={`${body.fruit}- ${idx}`}>
            <TCell>{body.fruit}</TCell>
            <TCell>{body.sun}</TCell>
            <TCell>{body.soil}</TCell>
          </Tr>
        ))}
      </TBody>
    </Table>
  </TableContainer>
);

const isSelectAllIndeterminate = (rows: IRowData[]) => {
  const numSelectedRows = rows.reduce((accumulator, row) => {
    if (row.selected) {
      return accumulator + 1;
    }

    return accumulator;
  }, 0);

  return numSelectedRows > 0 && numSelectedRows < rows.length;
};

const isSelectAllChecked = (rows: IRowData[]) =>
  rows.every((row) => row.selected);

const Actions = () => (
  <Menu>
    <MenuTrigger>
      <IconButton
        size={'sm'}
        icon={<LuMoreVertical />}
        variant="ghost"
        aria-label="More actions"
      />
    </MenuTrigger>
    <MenuList>
      <MenuItem>Edit</MenuItem>
      <MenuItem>Delete</MenuItem>
    </MenuList>
  </Menu>
);

const Selection = () => {
  const [data, setData] = useState(rowData);
  const [shiftEnabled, setShiftEnabled] = useState(false);
  const [focusedRowIndex, setFocusedRowIndex] = useState<number | undefined>(
    undefined
  );

  return (
    <TableContainer>
      <Table className="table-auto">
        <THead>
          <THeadRow>
            <THeadCell minimum>
              <Checkbox
                isIndeterminate={isSelectAllIndeterminate(data)}
                isChecked={isSelectAllChecked(data)}
                onChange={(e) => {
                  if (e.target.checked) {
                    const updatedRows = data.map((row) => ({
                      ...row,
                      selected: true,
                    }));

                    setData(updatedRows);
                  } else {
                    const updatedRows = data.map((row) => ({
                      ...row,
                      selected: false,
                    }));

                    setData(updatedRows);
                  }
                }}
              />
            </THeadCell>
            {TABLE_HEAD.map((head) => (
              <THeadCell key={head}>{head}</THeadCell>
            ))}
            <THeadCell overflow />
          </THeadRow>
        </THead>
        <TBody>
          {data.map((body, idx) => (
            <Tr key={`${body.fruit}- ${idx}`} isSelected={body.selected}>
              <TCell minimum>
                <Checkbox
                  isChecked={body.selected}
                  onKeyDown={(e) => {
                    if (e.key === 'Shift') {
                      setShiftEnabled(true);
                    }
                  }}
                  onKeyUp={() => {
                    setShiftEnabled(false);
                  }}
                  onChange={(e) => {
                    const updatedRows = [...data];

                    if (shiftEnabled && focusedRowIndex !== undefined) {
                      const startIndex = Math.min(focusedRowIndex, idx);
                      const endIndex = Math.max(focusedRowIndex, idx);

                      const isAllChecked = updatedRows
                        .slice(startIndex, endIndex + 1)
                        .every((slicedRow) => slicedRow.selected);

                      for (let x = startIndex; x <= endIndex; x++) {
                        if (x === idx && isAllChecked) {
                          updatedRows[x].selected = true;
                          continue;
                        }

                        updatedRows[x].selected = !isAllChecked;
                      }
                    } else if (e.target.checked) {
                      updatedRows[idx].selected = true;
                    } else {
                      updatedRows[idx].selected = false;
                    }

                    setData(updatedRows);
                    setFocusedRowIndex(idx);
                  }}
                />
              </TCell>
              <TCell>{body.fruit}</TCell>
              <TCell>{body.sun}</TCell>
              <TCell>{body.soil}</TCell>
              <TCell overflow>
                <Actions />
              </TCell>
            </Tr>
          ))}
        </TBody>
      </Table>
    </TableContainer>
  );
};

export const _Selection = () => {
  return <Selection />;
};

export const _Card = () => (
  <Card className="overflow-auto max-w-lg">
    <Selection />
  </Card>
);

export const FruitsTableComplete = () => (
  <Card>
    <CardHeader className="pb-0">
      <div className="mb-8 flex items-center justify-between gap-8">
        <div>
          <Typography variant="h5">Fruits</Typography>
          <Typography className="mt-1">
            See information about your favorite fruits
          </Typography>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <SearchInput className="max-w-xs" placeholder="Search for a fruit" />
      </div>
    </CardHeader>
    <CardBody className="overflow-auto px-0">
      <Selection />
    </CardBody>
    <CardFooter className="flex items-center justify-between">
      <Typography variant="small">Page 1 of 1</Typography>
      <ButtonGroup size="sm">
        <Button>Previous</Button>
        <Button>Next</Button>
      </ButtonGroup>
    </CardFooter>
  </Card>
);
