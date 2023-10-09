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
import { AbsenceScale, AbsenceTranslateFn } from './types';

export interface AbsenceAgendaProps extends HTMLVelcureProps<'div'> {
  scale: AbsenceScale;
  setScale: React.Dispatch<React.SetStateAction<AbsenceScale>>;
  translateFn: AbsenceTranslateFn;
}

export const AbsenceAgenda = forwardRef<HTMLDivElement, AbsenceAgendaProps>(
  (props, ref) => {
    const { className, scale, setScale, translateFn, ...restProps } = props;
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
                console.log(value);
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
            <Circle className="bg-yellow-100 h-5 w-5" />
            <span className="ml-2">{translateFn('new')}</span>
          </div>
          <div className="inline-flex flex-row gap-2 items-center px-2">
            <Circle className="bg-red-100 h-5 w-5" />
            <span className="ml-2">{translateFn('declined')}</span>
          </div>
          <div className="inline-flex flex-row gap-2 items-center px-2">
            <Circle className="bg-green-100 h-5 w-5" />
            <span className="ml-2">{translateFn('approved')}</span>
          </div>
        </div>
      </velcure.div>
    );
  }
);

AbsenceAgenda.displayName = 'AbsenceAgenda';
