import { ComponentPropsWithoutRef } from 'react';
import { usePopoverContext } from './popover-context';

export interface PopoverArrowProps extends ComponentPropsWithoutRef<'div'> {}

export const PopoverArrow: React.FC<PopoverArrowProps> = (props) => {
  const { getArrowProps, getArrowInnerProps } = usePopoverContext();

  return (
    <div {...getArrowProps()}>
      <div {...getArrowInnerProps({})}></div>
    </div>
  );
};
