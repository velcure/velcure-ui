import { CheckIcon, InfoIcon, WarningIcon } from '#/components/alert/src/icons';
import { Button, ButtonProps } from '#/components/button/src';
import { Typography } from '#/components/typography/src';
import { createContext } from '#/hooks';
import { cva } from 'class-variance-authority';
import { Modal, ModalProps, useModalContext } from './modal';
import { ModalBody } from './modal-body';
import { ModalContent } from './modal-content';
import { ModalFooter } from './modal-footer';
import { ModalOverlay } from './modal-overlay';

interface ConfirmationDialogOptions {
  confirmBtnText?: string;
  cancelBtnText?: string;
  onConfirm?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  intent?: 'success' | 'danger' | 'none';
}

const [ConfirmationDialogContextProvider, useConfirmationDialogContext] =
  createContext<ConfirmationDialogOptions>();

export interface ConfirmationDialogProps
  extends Omit<ModalProps, 'initialFocusRef'>,
    ConfirmationDialogOptions {}

/**
 * `ConfirmationDialog` component is used interrupt the user with a
 * mandatory confirmation or action.
 *
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/
 */
export function ConfirmationDialog(props: ConfirmationDialogProps) {
  const {
    children,
    isCentered,
    confirmBtnText = 'Confirm',
    cancelBtnText = 'Cancel',
    intent,
    onConfirm,
    ...rest
  } = props;

  return (
    <ConfirmationDialogContextProvider
      value={{
        confirmBtnText,
        cancelBtnText,
        onConfirm,
        intent,
      }}
    >
      <Modal {...rest} isCentered={isCentered ?? true}>
        <ModalOverlay />
        {children}
      </Modal>
    </ConfirmationDialogContextProvider>
  );
}

export interface ConfirmationDialogContentProps {
  children?: React.ReactNode;
  title: React.ReactNode;
}

const iconContainer = cva(
  [
    'mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full',
    'sm:mx-0 sm:h-10 sm:w-10',
  ],
  {
    variants: {
      intent: {
        none: 'bg-blue-100',
        success: 'bg-green-100',
        danger: 'bg-red-100',
      },
    },
  }
);

const icon = cva(['h-6 w-6'], {
  variants: {
    intent: {
      none: 'text-blue-600',
      success: 'text-green-600',
      danger: 'text-red-600',
    },
  },
});

const getIntentIcon = (intent: ConfirmationDialogOptions['intent']) => {
  switch (intent) {
    case 'danger':
      return WarningIcon;
    case 'success':
      return CheckIcon;
    default:
      return InfoIcon;
  }
};

export function ConfirmationDialogContent(
  props: ConfirmationDialogContentProps
) {
  const { children, title } = props;

  const { cancelBtnText, confirmBtnText, onConfirm, intent } =
    useConfirmationDialogContext();

  const BaseIcon = getIntentIcon(intent);

  const { onClose } = useModalContext();

  const buttonVariant: ButtonProps['variant'] =
    intent === 'danger' ? 'destructive' : 'primary';

  return (
    <ModalContent>
      <ModalBody className="py-5">
        <div className="sm:flex sm:items-start">
          <div
            className={iconContainer({
              intent,
            })}
          >
            <BaseIcon className={icon({ intent })} />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <Typography variant="h3" className="text-base">
              {title}
            </Typography>
            <div className="mt-2">
              {typeof children === 'string' ? (
                <Typography className="text-sm">{children}</Typography>
              ) : (
                children
              )}
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="flex gap-2 flex-col w-full sm:flex-row-reverse">
          <Button variant={buttonVariant} onClick={onConfirm}>
            {confirmBtnText}
          </Button>
          <Button variant="outline" onClick={onClose}>
            {cancelBtnText}
          </Button>
        </div>
      </ModalFooter>
    </ModalContent>
  );
}
