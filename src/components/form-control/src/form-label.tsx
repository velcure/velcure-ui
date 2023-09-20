import { cn } from '#/utilities';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { useFormControlContext } from './form-control';
import { RequiredIndicator } from './required-indicator';

export interface FormLabelProps extends ComponentPropsWithoutRef<'label'> {
  /**
   * @type React.ReactElement
   */
  requiredIndicator?: React.ReactElement;
  /**
   * @type React.ReactNode
   */
  optionalIndicator?: React.ReactNode;
}

/**
 * Used to enhance the usability of form controls.
 *
 * It is used to inform users as to what information
 * is requested for a form field.
 *
 * ♿️ Accessibility: Every form field should have a form label.
 */
export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  (props, ref) => {
    const {
      className,
      children,
      requiredIndicator = <RequiredIndicator />,
      optionalIndicator = null,
      ...restProps
    } = props;

    const field = useFormControlContext();
    const ownProps = field?.getLabelProps(restProps, ref) ?? {
      ref,
      ...restProps,
    };

    return (
      <label
        {...ownProps}
        className={cn(
          'block text-start text-sm leading-6 me-3 mb-2 font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          className
        )}
      >
        {children}
        {field?.isRequired ? requiredIndicator : optionalIndicator}
      </label>
    );
  }
);

FormLabel.displayName = 'FormLabel';
