import { Button } from '#/components/button/src';
import { Circle, HTMLVelcureProps, velcure } from '#/components/factory';
import { ChevronDownIcon } from '#/components/icons/src';
import {
  Menu,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  MenuTrigger,
} from '#/components/menu/src';
import { cn } from '#/utilities';
import { forwardRef } from 'react';
import { AbsenceScale } from './types';
import { useAbsenceCalendarContext } from './use-absence-calendar';

export interface AbsenceAgendaProps extends HTMLVelcureProps<'div'> {}

export const AbsenceAgenda = forwardRef<HTMLDivElement, AbsenceAgendaProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    const { agenda, scale, setScale, translateFn } =
      useAbsenceCalendarContext();

    if (!agenda) return null;

    return (
      <velcure.div
        className={cn('p-3 justify-between flex  w-full', className)}
        {...restProps}
        ref={ref}
      >
        <Menu>
          <MenuTrigger>
            <Button variant="outline" rightIcon={<ChevronDownIcon />}>
              {translateFn(scale)}
            </Button>
          </MenuTrigger>
          <MenuList>
            <MenuOptionGroup
              type="radio"
              value={scale}
              defaultValue={scale}
              onChange={(value) => {
                setScale(value as AbsenceScale);
              }}
            >
              <MenuItemOption value="week">
                {translateFn('week')}
              </MenuItemOption>
              <MenuItemOption value="month">
                {translateFn('month')}
              </MenuItemOption>
              <MenuItemOption value="year">
                {translateFn('year')}
              </MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        <div className="flex divide-x divide-muted">
          <div className="inline-flex flex-row gap-2 items-center px-2">
            <Circle className="bg-yellow-100 border border-yellow-300 h-5 w-5" />
            <span className="ml-2">{translateFn('new')}</span>
          </div>
          <div className="inline-flex flex-row gap-2 items-center px-2">
            <Circle className="bg-red-100 border border-red-300 h-5 w-5" />
            <span className="ml-2">{translateFn('declined')}</span>
          </div>
          <div className="inline-flex flex-row gap-2 items-center px-2">
            <Circle className="bg-green-100 border border-green-300 h-5 w-5" />
            <span className="ml-2">{translateFn('approved')}</span>
          </div>
        </div>
      </velcure.div>
    );
  }
);

AbsenceAgenda.displayName = 'AbsenceAgenda';
