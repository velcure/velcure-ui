import { mergeRefs } from '#/hooks';
import { createContext } from '#/hooks/react-context';
import { cn, dataAttr } from '#/utilities';
import { PropGetter } from '#/utilities/react-types';
import { VariantProps, cva } from 'class-variance-authority';
import {
  ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
  useId,
  useState,
} from 'react';

export interface FormControlOptions {
  /**
   * If `true`, the form control will be required. This has 2 side effects:
   * - The `FormLabel` will show a required indicator
   * - The form element (e.g, Input) will have `aria-required` set to `true`
   *
   * @default false
   */
  isRequired?: boolean;
  /**
   * If `true`, the form control will be disabled. This has 2 side effects:
   * - The `FormLabel` will have `data-disabled` attribute
   * - The form element (e.g, Input) will be disabled
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * If `true`, the form control will be invalid. This has 2 side effects:
   * - The `FormLabel` and `FormErrorIcon` will have `data-invalid` set to `true`
   * - The form element (e.g, Input) will have `aria-invalid` set to `true`
   *
   * @default false
   */
  isInvalid?: boolean;
  /**
   * If `true`, the form control will be readonly
   *
   * @default false
   */
  isReadOnly?: boolean;
}

interface FormControlContext extends FormControlOptions {
  /**
   * The label text used to inform users as to what information is
   * requested for a text field.
   */
  label?: string;
  /**
   * The custom `id` to use for the form control. This is passed directly to the form element (e.g, Input).
   * - The form element (e.g. Input) gets the `id`
   * - The form label id: `form-label-${id}`
   * - The form error text id: `form-error-text-${id}`
   * - The form helper text id: `form-helper-text-${id}`
   */
  id?: string;
}

function useFormControlProvider(props: FormControlContext) {
  const {
    id: idProp,
    isRequired,
    isInvalid,
    isDisabled,
    isReadOnly,
    ...htmlProps
  } = props;

  // Generate all the required ids
  const uuid = useId();
  const id = idProp || `field-${uuid}`;

  const labelId = `${id}-label`;
  const feedbackId = `${id}-feedback`;
  const helpTextId = `${id}-helptext`;

  /**
   * Track whether the `FormErrorMessage` has been rendered.
   * We use this to append its id the `aria-describedby` of the `input`.
   */
  const [hasFeedbackText, setHasFeedbackText] = useState(false);

  /**
   * Track whether the `FormHelperText` has been rendered.
   * We use this to append its id the `aria-describedby` of the `input`.
   */
  const [hasHelpText, setHasHelpText] = useState(false);

  // Track whether the form element (e.g, `input`) has focus.
  const [isFocused, setFocus] = useState(false);

  const getHelpTextProps = useCallback<PropGetter>(
    (props = {}, forwardedRef = null) => ({
      id: helpTextId,
      ...props,
      /**
       * Notify the field context when the help text is rendered on screen,
       * so we can apply the correct `aria-describedby` to the field (e.g. input, textarea).
       */
      ref: mergeRefs(forwardedRef, (node) => {
        if (!node) return;
        setHasHelpText(true);
      }),
    }),
    [helpTextId]
  );

  const getLabelProps = useCallback<PropGetter>(
    (props = {}, forwardedRef = null) => ({
      ...props,
      ref: forwardedRef,
      'data-focus': dataAttr(isFocused),
      'data-disabled': dataAttr(isDisabled),
      'data-invalid': dataAttr(isInvalid),
      'data-readonly': dataAttr(isReadOnly),
      id: props.id !== undefined ? props.id : labelId,
      htmlFor: props.htmlFor !== undefined ? props.htmlFor : id,
    }),
    [id, isDisabled, isFocused, isInvalid, isReadOnly, labelId]
  );

  const getErrorMessageProps = useCallback<PropGetter>(
    (props = {}, forwardedRef = null) => ({
      id: feedbackId,
      ...props,
      /**
       * Notify the field context when the error message is rendered on screen,
       * so we can apply the correct `aria-describedby` to the field (e.g. input, textarea).
       */
      ref: mergeRefs(forwardedRef, (node) => {
        if (!node) return;
        setHasFeedbackText(true);
      }),
      'aria-live': 'polite',
    }),
    [feedbackId]
  );

  const getRootProps = useCallback<PropGetter>(
    (props = {}, forwardedRef = null) => ({
      ...props,
      ...htmlProps,
      ref: forwardedRef,
      role: 'group',
    }),
    [htmlProps]
  );

  const getRequiredIndicatorProps = useCallback<PropGetter>(
    (props = {}, forwardedRef = null) => ({
      ...props,
      ref: forwardedRef,
      role: 'presentation',
      'aria-hidden': true,
      children: props.children || '*',
    }),
    []
  );

  return {
    isRequired: !!isRequired,
    isInvalid: !!isInvalid,
    isReadOnly: !!isReadOnly,
    isDisabled: !!isDisabled,
    isFocused: !!isFocused,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    hasFeedbackText,
    setHasFeedbackText,
    hasHelpText,
    setHasHelpText,
    id,
    labelId,
    feedbackId,
    helpTextId,
    htmlProps,
    getHelpTextProps,
    getErrorMessageProps,
    getRootProps,
    getLabelProps,
    getRequiredIndicatorProps,
  };
}

type FormControlProviderContext = Omit<
  ReturnType<typeof useFormControlProvider>,
  'getRootProps' | 'htmlProps'
>;

const [FormControlProvider, useFormControlContext] =
  createContext<FormControlProviderContext>({
    strict: false,
    name: 'FormControlContext',
  });

export { useFormControlContext };

const formControlClasses = cva([]);

export interface FormControlProps
  extends ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof formControlClasses>,
    FormControlContext {}

/**
 * FormControl provides context such as
 * `isInvalid`, `isDisabled`, and `isRequired` to form elements.
 *
 * This is commonly used in form elements such as `input`,
 * `select`, `textarea`, etc.
 */
export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  (props, ref) => {
    const { className, ...ownProps } = props;
    const {
      getRootProps,
      htmlProps: _,
      ...context
    } = useFormControlProvider(ownProps);

    return (
      <FormControlProvider value={context}>
        <div
          {...getRootProps({}, ref)}
          className={cn('w-full relative', className)}
        />
      </FormControlProvider>
    );
  }
);

FormControl.displayName = 'FormControl';
