import { HTMLVelcureProps, velcure } from '#/components/factory';
import { createContext } from '#/hooks';
import { ReactElement, Ref, forwardRef } from 'react';
import {
  FieldError,
  FieldValues,
  FormProvider as HookFormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';

interface FormOptions<T extends object> {
  methods: UseFormReturn<T>;
  /**
   * The submit handler.
   */
  onSubmit: SubmitHandler<T>;
  /**
   * Triggers when there are validation errors.
   */
  onError?: SubmitErrorHandler<T>;
  /**
   * @example (msg: FieldError) => i18n.exists(msg) ? i18n.t(msg) : msg
   */
  errorResolver?: (msg: FieldError) => React.ReactNode;
}

const [FormProvider, useFormContext] = createContext<{
  errorResolver: (msg: FieldError) => React.ReactNode;
}>({
  defaultValue: {
    errorResolver: (msg: FieldError) => msg.message,
  },
  strict: false,
});

export { useFormContext };

export interface FormProps<T extends object>
  extends Omit<HTMLVelcureProps<'form'>, 'onChange' | 'onSubmit' | 'onError'>,
    FormOptions<T> {}

export const Form = forwardRef(
  <T extends object>(
    props: FormProps<T>,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const {
      onSubmit,
      onError,
      children,
      methods,
      errorResolver = (msg: FieldError) => msg.message,
      ...restProps
    } = props;

    const { handleSubmit } = methods;

    return (
      <FormProvider
        value={{
          errorResolver,
        }}
      >
        <HookFormProvider {...methods}>
          <velcure.form
            ref={ref}
            {...restProps}
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            {children}
          </velcure.form>
        </HookFormProvider>
      </FormProvider>
    );
  }
) as <T extends FieldValues>(
  p: FormProps<T> & { ref?: Ref<HTMLFormElement> }
) => ReactElement;
