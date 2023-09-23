import { SlideOptions } from '#/components/transition/src';
import { createContext } from '#/hooks';
import { Modal, ModalProps } from './modal';

interface DrawerOptions {
  /**
   * The placement of the drawer
   * @default "right"
   */
  placement?: DrawerPlacement;
  /**
   * If `true` and drawer's placement is `top` or `bottom`,
   * the drawer will occupy the viewport height (100vh)
   */
  isFullHeight?: boolean;
}

const [DrawerContextProvider, useDrawerContext] =
  createContext<DrawerOptions>();

type LogicalPlacement = 'start' | 'end';
type LogicalPlacementMap = Record<
  LogicalPlacement,
  { ltr: SlideOptions['direction']; rtl: SlideOptions['direction'] }
>;
export type DrawerPlacement = SlideOptions['direction'] | LogicalPlacement;

const placementMap: LogicalPlacementMap = {
  start: { ltr: 'left', rtl: 'right' },
  end: { ltr: 'right', rtl: 'left' },
};

function getDrawerPlacement(
  placement: DrawerPlacement | undefined,
  dir: 'ltr' | 'rtl'
) {
  if (!placement) return;
  //@ts-expect-error
  return placementMap[placement]?.[dir] ?? placement;
}

export interface DrawerProps
  extends DrawerOptions,
    Omit<ModalProps, 'scrollBehavior' | 'motionPreset' | 'isCentered'> {}

/**
 * The Drawer component is a panel that slides out from the edge of the screen.
 * It can be useful when you need users to complete a task or view some details without leaving the current page.
 */
export function Drawer(props: DrawerProps) {
  const {
    isOpen,
    onClose,
    placement: placementProp = 'right',
    children,
    isFullHeight,
    ...rest
  } = props;

  const placement = getDrawerPlacement(placementProp, 'ltr');

  return (
    <DrawerContextProvider value={{ placement, isFullHeight }}>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        {...rest}
        scrollBehavior="inside"
      >
        {children}
      </Modal>
    </DrawerContextProvider>
  );
}

export { ModalBody as DrawerBody } from './modal-body';
export { ModalFooter as DrawerFooter } from './modal-footer';
export { ModalHeader as DrawerHeader } from './modal-header';
export { ModalOverlay as DrawerOverlay } from './modal-overlay';

export { useDrawerContext };
