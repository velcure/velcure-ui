import { HTMLVelcureProps, velcure } from '#/components/factory';
import { CheckIcon, MinusIcon } from '#/components/icons/src';

export interface CheckboxIconProps extends HTMLVelcureProps<'svg'> {
  /**
   * @default false
   */
  isIndeterminate?: boolean;
  /**
   * @default false
   */
  isChecked?: boolean;
}

export const CheckboxIcon: React.FC<CheckboxIconProps> = (props) => {
  const { isIndeterminate, isChecked, ...rest } = props;
  const BaseIcon = isIndeterminate ? MinusIcon : CheckIcon;

  return isChecked || isIndeterminate ? (
    <velcure.div className="flex items-center justify-center h-full">
      <BaseIcon {...rest} />
    </velcure.div>
  ) : null;
};
