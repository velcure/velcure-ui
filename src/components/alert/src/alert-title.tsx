import { Typography, TypographyProps } from '#/components/typography/src';
import { cn } from '#/utilities';

export interface AlertTitleProps extends Omit<TypographyProps, 'ref'> {}

export const AlertTitle: React.FC<AlertTitleProps> = (props) => {
  const { className, ...restProps } = props;
  return (
    <Typography
      variant="h6"
      className={cn('font-medium', className)}
      {...restProps}
    >
      {props.children}
    </Typography>
  );
};
