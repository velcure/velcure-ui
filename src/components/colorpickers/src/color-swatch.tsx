import { HTMLVelcureProps, Square, velcure } from '#/components/factory';
import { CheckIcon } from '#/components/icons/src';
import { useControllableState } from '#/hooks';
import { ariaAttr, cn } from '#/utilities';
import { darken, readableColor } from 'polished';
import React from 'react';

export type SwatchColor = {
  color: string;
  label: string;
};

export interface ColorSwatchProps
  extends Omit<HTMLVelcureProps<'table'>, 'onChange'> {
  colors: SwatchColor[][];
  value?: string;
  onChange?: (value: string) => void;
}

export const ColorSwatch = React.forwardRef<HTMLTableElement, ColorSwatchProps>(
  (props, ref) => {
    const {
      className,
      colors,
      value: valueProp,
      onChange,
      ...restProps
    } = props;

    const [value, setValue] = useControllableState<string>({
      value: valueProp,
      onChange,
    });

    return (
      <velcure.table
        role="grid"
        className={cn('border-collapse leading-normal indent-0', className)}
        {...restProps}
        ref={ref}
      >
        <tbody>
          {colors.map((row: SwatchColor[], rowIdx: number) => (
            <tr key={rowIdx}>
              {row.map((color: SwatchColor, colIdx: number) => {
                const checkColor = readableColor(color.color);

                return (
                  <td key={colIdx} className="p-2 text-[0px]">
                    <Square
                      as="button"
                      type="button"
                      style={
                        {
                          '--bg-color': color.color,
                          '--bg-color-hover': darken(0.05)(color.color),
                        } as React.CSSProperties
                      }
                      className={cn(
                        'w-5 h-5 shadow inline-block rounded transition-all outline-none border-0 p-0 cursor-pointer bg-[var(--bg-color)] hover:bg-[var(--bg-color-hover)]',
                        'focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-white'
                      )}
                      aria-selected={ariaAttr(value === color.color)}
                      onClick={() => {
                        setValue(color.color);
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          'h-4 w-4 transition-opacity',
                          value === color.color ? 'opacity-100' : 'opacity-0'
                        )}
                        style={{
                          color: checkColor,
                        }}
                      />
                    </Square>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </velcure.table>
    );
  }
);

ColorSwatch.displayName = 'ColorSwatch';
