import { FocusLockProps } from '#/components/focus-lock/src';
import { Portal, PortalProps } from '#/components/portal/src';
import { createContext } from '#/hooks';
import { AnimatePresence } from 'framer-motion';
import { UseModalProps, UseModalReturn, useModal } from './use-modal';

interface FocusableElement {
  focus(options?: FocusOptions): void;
}

export { ModalContextProvider, useModalContext };

interface ModalOptions extends Pick<FocusLockProps, 'lockFocusAcrossFrames'> {
  /**
   * If `false`, focus lock will be disabled completely.
   *
   * This is useful in situations where you still need to interact with
   * other surrounding elements.
   *
   * 🚨Warning: We don't recommend doing this because it hurts the
   * accessibility of the modal, based on WAI-ARIA specifications.
   *
   * @default true
   */
  trapFocus?: boolean;
  /**
   * If `true`, the modal will autofocus the first enabled and interactive
   * element within the `ModalContent`
   *
   * @default true
   */
  autoFocus?: boolean;
  /**
   * The `ref` of element to receive focus when the modal opens.
   */
  initialFocusRef?: React.RefObject<FocusableElement>;
  /**
   * The `ref` of element to receive focus when the modal closes.
   */
  finalFocusRef?: React.RefObject<FocusableElement>;
  /**
   * If `true`, the modal will return focus to the element that triggered it when it closes.
   * @default true
   */
  returnFocusOnClose?: boolean;
  /**
   * If `true`, scrolling will be disabled on the `body` when the modal opens.
   * @default true
   */
  blockScrollOnMount?: boolean;
  /**
   * Handle zoom/pinch gestures on iOS devices when scroll locking is enabled.
   * @default false.
   */
  allowPinchZoom?: boolean;
  /**
   * If `true`, a `padding-right` will be applied to the body element
   * that's equal to the width of the scrollbar.
   *
   * This can help prevent some unpleasant flickering effect
   * and content adjustment when the modal opens
   *
   * @default true
   */
  preserveScrollBarGap?: boolean;
}

type MotionPreset =
  | 'slideInBottom'
  | 'slideInRight'
  | 'slideInTop'
  | 'slideInLeft'
  | 'scale'
  | 'none';

export interface ModalProps extends UseModalProps, ModalOptions {
  children: React.ReactNode;
  /**
   * Props to be forwarded to the portal component
   */
  portalProps?: Pick<PortalProps, 'appendToParentPortal' | 'containerRef'>;
  /**
   * The transition that should be used for the modal
   * @default "scale"
   */
  motionPreset?: MotionPreset;
  /**
   * Fires when all exiting nodes have completed animating out
   */
  onCloseComplete?: () => void;
}

interface ModalContext extends ModalOptions, UseModalReturn {
  /**
   * The transition that should be used for the modal
   */
  motionPreset?: MotionPreset;
}

const [ModalContextProvider, useModalContext] = createContext<ModalContext>({
  strict: true,
  name: 'ModalContext',
  errorMessage:
    'useModalContext: `context` is undefined. Seems you forgot to wrap modal components in `<Modal />`',
});

/**
 * Modal provides context, theming, and accessibility properties
 * to all other modal components.
 *
 * It doesn't render any DOM node.
 *
 * @see Docs https://chakra-ui.com/docs/components/modal
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/
 */
export const Modal: React.FC<ModalProps> = (props) => {
  const { isOpen } = props;
  const modalProps: ModalProps = {
    scrollBehavior: 'outside',
    autoFocus: true,
    trapFocus: true,
    returnFocusOnClose: true,
    blockScrollOnMount: true,
    allowPinchZoom: false,
    motionPreset: 'scale',
    lockFocusAcrossFrames: true,
    ...props,
  };

  const {
    portalProps,
    children,
    autoFocus,
    trapFocus,
    initialFocusRef,
    finalFocusRef,
    returnFocusOnClose,
    blockScrollOnMount,
    allowPinchZoom,
    preserveScrollBarGap,
    motionPreset,
    lockFocusAcrossFrames,
    onCloseComplete,
  } = modalProps;

  const modal = useModal(modalProps);

  const context = {
    ...modal,
    autoFocus,
    trapFocus,
    initialFocusRef,
    finalFocusRef,
    returnFocusOnClose,
    blockScrollOnMount,
    allowPinchZoom,
    preserveScrollBarGap,
    motionPreset,
    lockFocusAcrossFrames,
  };

  return (
    <ModalContextProvider value={context}>
      <AnimatePresence onExitComplete={onCloseComplete}>
        {isOpen && <Portal {...portalProps}>{children}</Portal>}
      </AnimatePresence>
    </ModalContextProvider>
  );
};

Modal.displayName = 'Modal';
