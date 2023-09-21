import { MaybeRenderProp, runIfFn } from '#/utilities';
import { PopoverProvider } from './popover-context';
import { UsePopoverProps, usePopover } from './use-popover';

export interface PopoverProps extends UsePopoverProps {
  /**
   * The content of the popover. It is usually the `PopoverTrigger`,
   * and `PopoverContent`
   */
  children?: MaybeRenderProp<{
    isOpen: boolean;
    onClose: () => void;
    forceUpdate: (() => void) | undefined;
  }>;
}

/**
 * Popover is used to bring attention to specific user interface elements,
 * typically to suggest an action or to guide users through a new experience.
 */
export const Popover: React.FC<PopoverProps> = (props) => {
  const { children, ...restProps } = props;

  const context = usePopover({ ...restProps });

  return (
    <PopoverProvider value={context}>
      {runIfFn(children, {
        isOpen: context.isOpen,
        onClose: context.onClose,
        forceUpdate: context.forceUpdate,
      })}
    </PopoverProvider>
  );
};

Popover.displayName = 'Popover';
